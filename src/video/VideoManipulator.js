class VideoManipulator {

    constructor(video, canvas, filterFunction, applyFilter) {
      this.video = video;
      this.canvas = canvas;
      this.context = this.canvas.getContext("2d");
      this.filter = filterFunction;
      this.applyFilter = applyFilter;
    }

    setFilter(filterFunction){
      this.filter = filterFunction;
      this.applyFilter = true;
    }

    render() {

      this.context.drawImage(this.video,0,0);

      let frame = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

      if (this.applyFilter) {
          this.filter(frame, this.canvas.width, this.canvas.height);
      }

      this.context.putImageData(frame, 0, 0);
    }
}

export default VideoManipulator;
