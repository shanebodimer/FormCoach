#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <time.h>
#include <sys/time.h>
#include <unistd.h>
#include <string.h>
#include "client_ws.hpp"
#include "server_ws.hpp"
#include "LSM9DS1_Types.h"
#include "LSM9DS1.h"
#include <pthread.h>
#include <map>

using namespace std;

using WsServer = SimpleWeb::SocketServer<SimpleWeb::WS>;
using WsClient = SimpleWeb::SocketClient<SimpleWeb::WS>;

int main() {
  
  cout<< "Beginning IMU Setup" <<endl;
  LSM9DS1 imu(IMU_MODE_I2C, 0x6b, 0x1e);
  imu.setGyroScale(500);
  imu.setAccelScale(2);
  map<int, pthread_t> worker_handles;

  imu.begin();
  if (!imu.begin()) {
      cout<< "Failed to communicate with LSM9DS1." <<endl;
      exit(EXIT_FAILURE);
  }
  imu.calibrate();


  // WebSocket (WS)-server at port 8080 using 1 thread
  WsServer server;
  server.config.port = 8080;

  auto &form_data = server.endpoint["^/formdata$"];
  form_data.on_open = [&imu, &server, &worker_handles](shared_ptr<WsServer::Connection> connection) {

    for(auto &a_connection : server.get_connections())
    {
      if( a_connection != connection)
      {
        a_connection->send_close(1000);
        this_thread::sleep_for(chrono::seconds(1));
      }
    }

    cout << "Server: Opened connection " << connection.get() << endl;

    // Trick to define a recursive function within this scope (for your convenience):
    class MessageServer {
    public:
      static void wait_and_send(shared_ptr<WsServer::Connection> connection, LSM9DS1& imu, map<int, pthread_t>& worker_handles) {
        std::thread wait_and_send_thread([connection, &imu, &worker_handles] {
          //cout<< "data?" <<endl;
          this_thread::sleep_for(chrono::milliseconds(20));
          auto message = make_shared<WsServer::SendStream>();
          char data_string[100];
          
          //try
          //{
            while (!imu.gyroAvailable()) ;
            imu.readGyro();
            while(!imu.accelAvailable()) ;
            imu.readAccel();
            //cout<< "got data" <<endl;

            sprintf( data_string, "%f %f %f %f %f %f", imu.calcGyro(imu.gx), imu.calcGyro(imu.gy), imu.calcGyro(imu.gz), imu.calcAccel(imu.ax), imu.calcAccel(imu.ay), imu.calcAccel(imu.az) );

            //cout<< "sending data!" <<endl;
            *message << data_string;
            connection->send(message, [connection, &imu, &worker_handles](const SimpleWeb::error_code &ec) {
              if(!ec)
                wait_and_send(connection, imu, worker_handles);
            });
          //}
          //catch( const runtime_error &e)
          //{
            //cout<< "Connection error: closing socket" <<endl;
            //connection->send_close(1000);
            //return;
          //}
        });
        worker_handles.emplace(make_pair((int)connection.get(), wait_and_send_thread.native_handle()));;
        wait_and_send_thread.detach();
      }
    };
    MessageServer::wait_and_send(connection, imu, worker_handles);
  };
  
  form_data.on_close = [&imu, &worker_handles](shared_ptr<WsServer::Connection> connection, int status, const string & /*reason*/) {
      cout << "Server: Closed connection " << connection.get() << " with status code " << status << endl;
      pthread_cancel(worker_handles[(int)connection.get()]);
      worker_handles.erase((int)connection.get());
  };


  cout<< "Launching server" <<endl;
  thread server_thread([&server]() {
      // Start WS-server
      server.start();
  });


  server_thread.join();
}
