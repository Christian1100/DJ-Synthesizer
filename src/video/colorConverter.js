class ColorConverter{

  static rgb2hsv(input){

    let output= {h:0, s:0, v:0};
    let min, max, delta;

    min = input.r < input.g ? input.r : input.g;
    min = min  < input.b ? min  : input.b;

    max = input.r > input.g ? input.r : input.g;
    max = max  > input.b ? max  : input.b;

    output.v = max;                                // v
    delta = max - min;
    if (delta < 0.00001)
    {
        output.s = 0;
        output.h = 0; // undefined, maybe nan?
        return output;
    }
    if( max > 0.0 ) { // NOTE: if Max is == 0, this divide would cause a crash
        output.s = (delta / max);                  // s
    } else {
        // if max is 0, then r = g = b = 0              
            // s = 0, h is undefined
        output.s = 0.0;
        output.h = undefined;                            // its now undefined
        return output;
    }
    if( input.r >= max )                           // > is bogus, just keeps compilor happy
        output.h = ( input.g - input.b ) / delta;        // between yellow & magenta
    else
    if( input.g >= max )
        output.h = 2.0 + ( input.b - input.r ) / delta;  // between cyan & yellow
    else
        output.h = 4.0 + ( input.r - input.g ) / delta;  // between magenta & cyan

    output.h *= 60.0;                              // degrees

    if( output.h < 0.0 )
        output.h += 360.0;

    return output;
}


  static hsv2rgb(input){
  
    let h, p, q, t, ff;
    let i;
    let output= {r: 0, g: 0, b: 0};

    if(input.s <= 0.0) {       // < is bogus, just shuts up warnings
        output.r = input.v;
        output.g = input.v;
        output.b = input.v;
        return output;
    }
    h = input.h;
    if(h >= 360.0) h = 0.0;
    h /= 60.0;
    i = h;
    ff = h - i;
    p = input.v * (1.0 - input.s);
    q = input.v * (1.0 - (input.s * ff));
    t = input.v * (1.0 - (input.s * (1.0 - ff)));

    switch(i) {
    case 0:
        output.r = input.v;
        output.g = t;
        output.b = p;
        break;
    case 1:
        output.r = q;
        output.g = input.v;
        output.b = p;
        break;
    case 2:
        output.r = p;
        output.g = input.v;
        output.b = t;
        break;

    case 3:
        output.r = p;
        output.g = q;
        output.b = input.v;
        break;
    case 4:
        output.r = t;
        output.g = p;
        output.b = input.v;
        break;
    case 5:
    default:
        output.r = input.v;
        output.g = p;
        output.b = q;
        break;
    }
    return output;     
}
}

export default ColorConverter;
