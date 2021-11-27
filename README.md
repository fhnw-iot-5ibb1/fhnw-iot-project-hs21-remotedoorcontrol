# IoT Engineering
## Project RemoteDoorControl

> *Note: Do not work on this repository right away.*<br/>
> *[Create your copy or join a team by clicking this GitHub Classroom link](https://classroom.github.com/a/yaT6h80x).*

## Introduction
This project is part of the [IoT Engineering](../../../fhnw-iot) course.

* 2-person teams, building an IoT system.
* 32 hours of work per person, 1 prototype.
* 10' presentation of the project at Demo Day.
* Slides, source code and setup steps on GitHub.
* Both team members are able to explain the project.

### Team members
* @Daught, Sebastian Fernandez
* @christianwernlistudentsfhnw, Christian Wernli

## Deliverables
The following deliverables are mandatory.

### Source code
Source code, Arduino C, JS or Python, committed to (this) project repo.

[RemoteDoorControl/Arduino/DoorControl.ino](RemoteDoorControl/Arduino/00-Motor_Control.ino)

[RemoteDoorControl/RPI/Nodejs/frontend/client.js](RemoteDoorControl/RPI/Nodejs/frontend/client.js)

[RemoteDoorControl/RPI/Nodejs/backend/server.js](RemoteDoorControl/RPI/Nodejs/backend/server.js)

1) Embedded code / microcontroller firmware.
2) Glue Code used on the gateway or "in the cloud".
3) App or Web UI code, or IoT platform setup steps.

### Presentation
4-slide presentation, PDF format, committed to (this) project repo.

[MY_TEAM_PROJECT_PRESENTATION.pdf](MY_TEAM_PROJECT_PRESENTATION.pdf)

1) Use-case of your project.
2) Reference model of your project.
3) Single slide interface documentation.
4) Issues you faced, how you solved them.

### Live demo
Working end-to-end prototype, "device to cloud", part of your 10' presentation.

[https://192.168.192.20:4001/](https://192.168.192.20:4001/)

1) Api call on Raspberry Pi triggers triggers event on Arduino
2) The door will be opened
3) Response will be sent to the API caller

## Submission deadline
Commit and push to (this) project repo before Demo Day, _17.01.2022, 00:00_.
