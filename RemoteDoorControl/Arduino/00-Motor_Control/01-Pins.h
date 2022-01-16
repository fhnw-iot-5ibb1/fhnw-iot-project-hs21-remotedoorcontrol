// Pins

// Motor A connections
int in3 = 5;
int in4 = 4;

// Motor B connections
int in1 = 7;
int in2 = 6;

// Endstop to change state (Inside)
int S0 = A0;


// Endstop "Door A Open"
int S3 = A1;
// Endstop "Door A Closed"
int S4 = A2;

// Endstop "Door B Open"
int S1 = A3;
// Endstop "Door B Closed"
int S2 = A4;

//Fingerprint Sensor
int F1 = 8;
int F2 = 9;

int motorAisMoving = 0;
int motorBisMoving = 0;

int isOpenA = 0; // door motor A is closed = 0
int isOpenB = 0; // door motor B is closed = 0


int changedStateDoorAFinit = 0;
int changedStateDoorBFinit = 0;

int speed = 254;
