// Move to DoorClose

  // This function lets you control spinning direction of motors
  
  void doorcloseA()
  {
    int V2 = digitalRead(S2);
    // Serial.println("V2" + (char)V2);
    if(V2 == 0){
      motorAisMoving = 0;
    }
    
    if (motorAisMoving == 1)
    {
      analogWrite(enA, 255);
      
      digitalWrite(in1, LOW);
      digitalWrite(in2, HIGH);      
    }else{
      // Serial.println("Should stop V2");
      analogWrite(enA, 0);
      
      digitalWrite(in1, LOW);
      digitalWrite(in2, LOW);
      isOpenA = 0;
    }
  }
  void doorcloseB()
  {
    int V4 = digitalRead(S4);
    // Serial.println("V4" + (char)V4);
    if(V4 == 0){
      motorBisMoving = 0;
    }
    
    if (motorBisMoving == 1)
    {
      analogWrite(enB, 255);
      
      digitalWrite(in3, LOW);
      digitalWrite(in4, HIGH);      
    }else{
      // Serial.println("Should stop V4");
      analogWrite(enB, 0);
      
      digitalWrite(in3, LOW);
      digitalWrite(in4, LOW);
      isOpenB = 0;
    }
  }
