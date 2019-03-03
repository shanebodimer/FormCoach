## Bluetrace

Simplifying athletic form feedback through instant micro-movement analysis

## Inspiration

Athletic training, for experts or beginners, requires constant practice to perfect one’s form. Whether it’s baseball, swimming, or frisbee, knowing the right movements is important. Athletic form is so important that coaches dedicate time to observing and critiquing their own players forms.

Unfortunately, this type of coaching is hard. Watching one’s athletic form requires constant attention and an quick set of eyes. It’s challenging to notice incorrect movements or habits that negatively affect performance. Some coaches will go as far to video-record games and practices for viewing later. The current solutions are ineffective and challenging to accomplish.

We were inspired to build something that makes form coaching easy, quick, and accurate.

## What it does

Bluetrace is a personal motion tracker, live-analysis phone app, and comprehensive web dashboard for all things form coaching.

Bluetrace uses motion data from a device attached to the athletes hand. It then live-streams the data directly to a phone app for coach analysis, enabling the coach to provide instant feedback. Data is then stored in a database for further analysis on our web dashboard. This dashboard gives the user their athletic history, motion data, and other analysis tools.

## Special prizes

- **Best Data Hack**: Displays live data & analysis from wearable hardware
- **Human Centered Design**: Individualized & instant feedback on micro-movements
- **.TECH domain registered with Domain.com**: bluetrace.tech
- **Best User Interface**: Consistent design provides enjoyable user experience

## How we built it

- Gyro/Accelerometer sensor wired to Raspberry Pi
- C++ code on Raspberry Pi streams data via websocket to React-Native phone app
- React-Native app graphs incoming data and identifies athletic form trends
- React-Native app provides suggestions on improvements based on correct datasets
- React-Native app uploads captured motion to Google Cloud Firestore
- React web dashboard pulls recorded data from Google Cloud Firestore for further analysis

## Challenges we ran into

- Had trouble communicating between Raspberry Pi sensor and React-Native app. We originally wanted to use Bluetooth but were unable to use Bluetooth with React-Native. Instead, we used a wifi connection to stream the data via a websocket.
- Interpreting gyroscopic and acceleration data to create useful insights for coaches and athletes. A graph showing six lines of various is not actionable data for an athletics coach. Bluetrace has to interpret the data to outline specific improvements for the athlete.

## What's next for Bluetrace

In the future, we hope to explore a more compact motion sensor. We think this can be accomplished by using pre-existing motion devices like the Apple Watch or Fitbit. Integrating our project with their APIs would allow this to work.
