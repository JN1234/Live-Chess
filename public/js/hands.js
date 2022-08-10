let fingertips = [8, 12, 16, 20]
var handsfree
var sketchWidth=600

function setup () {  
buttonStart = createButton('Start Webcam')
buttonStart.class('handsfree-show-when-stopped')
buttonStart.class('handsfree-hide-when-loading')
buttonStart.mousePressed(() => handsfree.start())

// Create a "loading..." button
buttonLoading = createButton('...loading...')
buttonLoading.class('handsfree-show-when-loading')

// Create a stop button
buttonStop = createButton('Stop Webcam')
buttonStop.class('handsfree-show-when-started')
buttonStop.mousePressed(() => handsfree.stop())
  sketch = createCanvas(600, 600)
  
  colorMap = [
    // Left fingertips
    [color(0, 0, 0), color(255, 0, 255), color(0, 0, 255), color(255, 255, 255)],
    // Right fingertips
    [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0)]
  ]
  
  handsfree = new Handsfree({
    showDebug: true, // Comment this out to hide the default webcam feed with landmarks
    hands: true,
  })
  handsfree.enablePlugins('browser')
  
  handsfree.plugin.pinchScroll.disable()

}



function fingerPaint () {
  // Canvas bounds to make drawing easier
  // Since the canvas is inside an Iframe, we reach out and get it's containing iframe's bounding rect
  let bounds = document.querySelector('canvas').getClientRects()[0]
  // Check for pinches and create dots if something is pinched
  const hands = handsfree.data?.hands

  // Paint with fingers
  if (hands?.pinchState) {
    // Loop through each hand
    let state =hands.pinchState[1][0]
  

    let x = sketchWidth - hands.origPinch[1][0].x * sketchWidth
    let y = hands.origPinch[1][0].y * sketchWidth
    
          // Start line on the spot that we pinched
         
            if (state === 'start') {

                // Add a line to the paint array
                } else if (state === 'held') {
        
                  console.log("held",{x,y})
                }
                else if (state === 'released') {
                  console.log("released",{x,y})
              }
         
        
        
  } 
  
  // Clear everything if the left [0] pinky [3] is pinched
  if (hands?.pinchState && hands.pinchState[0][3] === 'released') {
    
    console.log("undo")
  }
  
}



function drawHands () {
  const hands = handsfree.data?.hands
  
  // Bail if we don't have anything to draw
  if (!hands?.landmarks) return
  
  // Draw keypoints
  hands.landmarks.forEach((hand, handIndex) => {
    hand.forEach((landmark, landmarkIndex) => {
      // Set color
      // @see https://handsfree.js.org/ref/model/hands.html#data
      if (colorMap[handIndex]) {
        switch (landmarkIndex) {
          case 8: fill(colorMap[handIndex][0]); break
          case 12: fill(colorMap[handIndex][1]); break
          case 16: fill(colorMap[handIndex][2]); break
          case 20: fill(colorMap[handIndex][3]); break
          default:
            fill(color(255, 255, 255))
        }                
      }
      // Set stroke
      if (handIndex === 0 && landmarkIndex === 8) {
        stroke(color(255, 255, 255))
        strokeWeight(5)
        circleSize = 40
      } else {
        stroke(color(0, 0, 0))
        strokeWeight(0)
        circleSize = 10
      }
      
      circle(
        // Flip horizontally
        sketchWidth - landmark.x * sketchWidth,
        landmark.y * sketchWidth,
        circleSize
      )
    })
  })
}