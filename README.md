# anglecut

anglecut.js adds the attribute anglecut to ```<img />``` Tag.

Using this attribute, you can create simple angular cuts on your images.

For security reason the browser do not allow access to images placed on a different domain or ip. You have to work on a website with a domain and the image must be on the same domain.

```
Will work > http://127.0.0.1/...
Will not work > file:///...
```


# usage
```html
anglecut="top right bottom left"
anglecut="top (right/left) bottom"
anglecut="(top/bottom) (right/left)"
anglecut="(top/bottom/right/left)"
```
Top, right, bottom and left values must be expressed in degrees and can be positive or negative.


```html
    <img src="city-863692_640.jpg" alt="">
    <img anglecut="5" src="city-863692_640.jpg" alt="">
    <img anglecut="-5" src="city-863692_640.jpg" alt="">    
    <img anglecut="5 -5" src="city-863692_640.jpg" alt="">
    <img anglecut="-5 5" src="city-863692_640.jpg" alt="">    
    <img anglecut="5 0 -5" src="city-863692_640.jpg" alt="">
    <img anglecut="-5 0 5" src="city-863692_640.jpg" alt="">    
```
