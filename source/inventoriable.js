  this.pointerDown = function( pointerInfo, pickInfo ) {

    // TODO: Find player rover and get its distance from this object
    //       to determine if the object can be grabbed.

    var pos = { "x": pointerInfo.screenPosition[0], "y": pointerInfo.screenPosition[1] };
    this.grab( pos );

  }

  this.grab = function( position ) {

    this.grabbed( this.client, this.iconSrc, position, this.parent.name );

  }

  //@ sourceURL=source/inventoriable.vwf