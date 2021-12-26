// Move to DoorClose

  // This function lets you control spinning direction of motors
  
  void doorcloseA()
  {
    int V2 = digitalRead(S2);
     // Serial.println("V2" + (char)V2);
    if(V2 == 1){
      motorAisMoving = 0;
    }
    
    if (motorAisMoving == 1)
    {
      analogWrite(in1, speed);
      analogWrite(in2, 0);      
    }else{
       // Serial.println("Should stop V2");      
      analogWrite(in1, 0);
      analogWrite(in2, 0);
      isOpenA = 0;
    }
  }
  void doorcloseB()
  {
    int V4 = digitalRead(S4);
    //Serial.println("V4");
    //Serial.println(V4);
    
    if(V4 == 1){
      motorBisMoving = 0;
    }

    if (motorBisMoving == 1)
    {
      analogWrite(in3, speed);
      analogWrite(in4, 0);      
    }else{
       // Serial.println("Should stop V4");      
      analogWrite(in3, 0);
      analogWrite(in4, 0);
      isOpenB = 0;
    }
  }
