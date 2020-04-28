class Hotel {
  private float _la,_lo;
  private String _name,_region,_country;
  private float _distanceToClosestHotel;
  private int _id;
  
  Hotel(float la, float lo, String name, String region, String country, int id) {
    _la = la;
    _lo = lo;
    _name = name;
    _region = region;
    _country = country;
    _id = id;
    
    _distanceToClosestHotel = 40000.0;
  }
  
  public void findDistanceToClosestHotel(ArrayList<Hotel> hotels, int hotelsLength) {
    for(int i=1;i<hotelsLength;i++) {
      Hotel h = hotels.get(i);
      if(h.getId() == _id) continue;
      
      float d = dist(h.getLo(), h.getLa(), _lo, _la);
      if(d < _distanceToClosestHotel) {
        _distanceToClosestHotel = d;
        if(d < 6) return; //threshold to improve performance - after running this with a threshold of d < .5 degrees, I determined that the most remote hotel is at least 6 degrees from its nearest neighbor  
      }
    }
    
    println(_name + ", " + _id + ": closest above threshold: " + _distanceToClosestHotel);
  }
  
  public float getLa() {
    return _la;
  }
  
  public float getLo() {
    return _lo;
  }
  
  public int getId() {
    return _id;
  }
  
  public float getDistanceToClosestHotel() {
    return _distanceToClosestHotel;
  }
  
  public String toString() {
    return _name + " in " + _region + ", " + _country;
  }
}
