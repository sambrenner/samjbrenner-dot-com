String[] northernmost;
float maxLa = -90.0;

void checkNorthernmost(float la, String[] cols) {
  if(la < maxLa) {
    maxLa = la;
    northernmost = cols;
    println("The current northernmost hotel is " + northernmost[1] + ", located in " + northernmost[4] + ", " + northernmost[7]);
  }
}