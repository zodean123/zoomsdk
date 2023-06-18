import "./App.css";
import { ZoomMtg } from "@zoomus/websdk";
import React from "react";

class App extends React.Component {



  constructor(props) {
    super(props);

    this.state = {
      signature: "",
      passCode: "BD6dzt",
      // meetingNumber: " 899 7232 3523",
      // apiKey: "BvXsm3yKRVyEEuJxDoJRNw",
      // apiSecret: "l2AITnDu1HRoD4C7xX4SF7rLBmImDD3R",
      userName: "Dipan Kumar",
      userEmail: "dipanmallick7085@gmail.com",
      role: "1", 
    };
  }
  initializeWebSDK() {
    ZoomMtg.init({
      leaveUrl: "http://localhost:3000/",
      isSupportAV: true,
      success: (success) => {
        ZoomMtg.join({
          signature: this.state.signature,
          passWord: this.state.passCode,
          meetingNumber: this.state.meetingNumber,
          apiKey: this.state.apiKey,
          userName: this.state.userName,
          userEmail: this.state.userEmail,

          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  handleJoinButton = (event) => {
    this.generateSignature().then(
      (result) => {
        this.setState({
          signature: result,
        });
    
        ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.9/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();

        this.initializeWebSDK();

       
        document.getElementById("zmmtg-root").style.display = "block";
      },
      (error) => {
        console.log("error");
      }
    );
  };

  generateSignature = (event) => {
    return new Promise((resolve, reject) => {
      try {
        const signature = ZoomMtg.generateSignature({
          meetingNumber: "951 178 3385",
          apiKey: "BvXsm3yKRVyEEuJxDoJRNw",
          apiSecret: "3pJySreaSUyo27VzrqATnA",
          role: 1,
        });
        resolve(signature);
      } catch (e) {
        reject(Error("generate signature rejected"));
      }
    });
  };

  handleMeetingNumberChange(event) {
    this.setState({meetingNumber: event.target.value});
  }
  handlePaascodeChange(event) {
    this.setState({passCode: event.target.value});
  }
  render() {
    return (
      <div className="App">
        <h2 className="meeting-header">Join Meeting</h2>
        <div className="meeting-container">
          <div>
            <label for="meetingid">Meeting Number</label>
            <input
              type="text"
              id="meetingid"
              placeholder="Meeting Number"
              value={this.state.meetingNumber}
              onChange={this.handleMeetingNumberChange.bind(this)}
            />
          </div>
          <div>
            <label for="passcode">Passcode</label>
            <input
              type="text"
              placeholder="Passcode"
              value={this.state.passCode}
              onChange={this.handlePaascodeChange.bind(this)}
            />
          </div>
        </div>
        <div className="action-continer">
          <button
            className="join-meeting-button"
            onClick={this.handleJoinButton}
          >
            Join Meeting
          </button>
        </div>
      </div>
    );
  }
}

export default App;