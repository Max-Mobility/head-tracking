# head-tracking
Using OpenPose to track a user's head position and orientation


```bash
cd [openpose repo directory]
./build/examples/openpose/openpose.bin --camera 2 --keypoint_scale '4' --write_json ~/output_dir

roslaunch rosbridge_server rosbridge_websocket.launch

cd [head-tracking repo directory]/test
node head-tilt-ros.js ~/output_dir
```
