// Pins

// Motor A connections
int enA = 7;
int in1 = 6;
int in2 = 5;
// Motor B connections
int enB = 2;
int in3 = 4;
int in4 = 3;

// Endstop to change state (Inside)
int S0 = A0;
// Endstop "Door Open"
int S1 = A1;
// Endstop "Door Closed"
int S2 = A2;
// Endstop "Door Open"
int S3 = A3;
// Endstop "Door Closed"
int S4 = A4;

//Fingerprint Sensor
int F1 = 8;
int F2 = 9;

int motorAisMoving = 0;
int motorBisMoving = 0;

int isOpenA = 0; // door motor A is closed = 0
int isOpenB = 0; // door motor B is closed = 0


int changedStateDoorAFinit = 0;
int changedStateDoorBFinit = 0;
