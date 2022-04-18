import React from "react";
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from "react-native";
import { vibrate } from "./utils";

const DEFAULT_WORK_TIMER = 25;
const DEFAULT_REST_TIMER = 0;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workTimer: DEFAULT_WORK_TIMER,
      restTimer: DEFAULT_REST_TIMER,
      timer: DEFAULT_WORK_TIMER * 60,
      isWorkingTimer: true,
      isRunning: false
    };
  }

  checkTimer = () => {
    const {
      isRunning,
      timer,
      isWorkingTimer,
      restTimer,
      workTimer
    } = this.state;
    if (isRunning && !timer) {
      vibrate();
      this.setState({
        timer: isWorkingTimer ? Number(restTimer) * 60 : Number(workTimer) * 60,
        isWorkingTimer: !this.state.isWorkingTimer
      });
    }
  };

  dec = () => {
    this.setState(
      prevState => ({
        timer: prevState.timer - 1
      }),
      this.checkTimer
    );
  };

  startTimer = () => {
    this.interval = setInterval(this.dec, 1000);

    this.setState({
      isRunning: !this.state.isRunning
    });
  };

  stopTimer = () => {
    clearInterval(this.interval);

    this.setState({
      isRunning: !this.state.isRunning
    });
  };

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  onStartStopPress = () => {
    this.state.isRunning ? this.stopTimer() : this.startTimer();
  };

  onResetPress = () => {
    const { isWorkingTimer } = this.state;
    clearInterval(this.interval);
    this.setState({
      timer: isWorkingTimer
        ? this.state.workTimer * 60
        : this.state.restTimer * 60,
      isRunning: false
    });
  };

  onChangeWorkTimer = time => {
    clearInterval(this.interval);
    const isWorkingTimerData = this.state.isWorkingTimer
      ? {
          timer: Number(time) * 60,
          isRunning: false
        }
      : {};
    this.setState({
      workTimer: time,
      ...isWorkingTimerData
    });
  };

  onChangeRestTimer = time => {
    const breakTimerData = !this.state.isWorkingTimer
      ? {
          timer: Number(time) * 60,
          isRunning: false
        }
      : {};
    clearInterval(this.interval);
    this.setState({
      restTimer: time,
      ...breakTimerData
    });
  };

  timeFormatter = () => {
    const { timer } = this.state;
    const mins = ~~(timer / 60);
    const secs = ~~timer % 60;
    return `${mins}: ${secs < 10 ? "0" : ""}${secs}`;
  };

  render() {
    const {
      timer,
      isRunning,
      isWorkingTimer,
      restTimer,
      workTimer
    } = this.state;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.centeredView}>
            <Text style={styles.timer}>
              {isWorkingTimer ? "Work Timer" : "Break Timer"}
            </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <View style={styles.timerView}>
              <Text style={styles.timer}>{this.timeFormatter()}</Text>
            </View>
          </View>
          
          <View style={styles.buttonsView}>
            <TouchableOpacity
              style={isRunning ? styles.buttonPause : styles.buttonStart}
              onPress={this.onStartStopPress}
            >
              <Text style={styles.buttonText}>
                {isRunning ? "Pause" : "Start"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.buttonReset} 
              onPress={this.onResetPress}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Work timer(min)</Text>
            <TextInput
              style={styles.input}
              onChangeText={timer => this.onChangeWorkTimer(timer)}
              value={workTimer.toString()}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Break timer(min)</Text>
            <TextInput
              style={styles.input}
              onChangeText={timer => this.onChangeRestTimer(timer)}
              value={restTimer.toString()}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 35
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 100,
    marginBottom: 10
  },
  buttonStart: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009900"
  },
  buttonPause: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red"
  },
  buttonReset: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#777777"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 10
  },
  timer: {
    fontSize: 40
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  input: {
    height: 35,
    width: 120,
    fontWeight: '700',
    marginLeft: 5,
    paddingLeft: 8,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10
  },
  centeredView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  timerView: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderColor: 'black',
    borderWidth: 1,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center"
  },
  labelText: {
    fontSize: 17,
    fontWeight: 'bold'
  }
});
