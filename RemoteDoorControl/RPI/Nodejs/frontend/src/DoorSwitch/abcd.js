$(document).ready(function() {
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(cb) {
        setTimeout(() => cb(new Date()), 1000 / 60);
      }
    }
    
    const TIME_TO_FILL_FPRINT = 700; //ms
    const TIME_TO_REMOVE_FPRINT = 250;
  
    const fprintPathSelector = '.demo__fprint-path';
    const $fprintPaths = $('.demo__fprint-path');
    const $fprint = $('.demo__fprint');
    const $screen = $('.demo__screen');
    const $endingPaths = $('.demo__ending-path');
    
    let isFprintAnimationInProgress = false;
    let isFprintAnimationOver = false;
    let curFprintPathsOffset = -1;
    let fprintProgressionDirection = 1;    
    let lastRafCallTimestamp = 0;
    let fprintTick = getPropertyIncrement(0, 1, TIME_TO_FILL_FPRINT);
    let fprintPaths = [];
    const fprintPathsFirstHalf = [];
    const fprintPathsSecondHalf = [];
    
    for (let i = 0; i < $(fprintPathSelector).length; i++) {
      fprintPaths.push(new Path(fprintPathSelector, i));
      fprintPaths[i].offset(-1).makeVisible();
      if (fprintPaths[i].removesForwards)
        fprintPathsSecondHalf.push(fprintPaths[i]);
      else
        fprintPathsFirstHalf.push(fprintPaths[i]);
    }
    
    function fprintFrame(timestamp) {
      if (timestamp - lastRafCallTimestamp >= 1000 / 65) {
        lastRafCallTimestamp = timestamp;
        curFprintPathsOffset += fprintTick * fprintProgressionDirection;
        offsetAllFprintPaths(curFprintPathsOffset);
      }
      
      if (curFprintPathsOffset >= -1 && curFprintPathsOffset <= 0) {
        isFprintAnimationInProgress = true;
        window.requestAnimationFrame(fprintFrame);
      }
      
      else if (curFprintPathsOffset > 0) {
        curFprintPathsOffset = 0;
        offsetAllFprintPaths(curFprintPathsOffset);
        isFprintAnimationInProgress = false;
        isFprintAnimationOver = true;
        $fprint.addClass('demo__fprint--no-bg');
        // startElasticAnimation();
        fprintTick = getPropertyIncrement(0, 1, TIME_TO_REMOVE_FPRINT);
        window.requestAnimationFrame(removeFprint);
      }
      else if (curFprintPathsOffset < -1) {
        curFprintPathsOffset = -1;
        offsetAllFprintPaths(curFprintPathsOffset);
        isFprintAnimationInProgress = false;
      }
    }
    
    function removeFprint() {
      $endingPaths.addClass('demo__ending-path--removed');
      setTimeout(() => {
        $endingPaths.addClass('demo__ending-path--transparent');
      }, TIME_TO_REMOVE_FPRINT * 0.9);
      fprintProgressionDirection = -1;
      window.requestAnimationFrame(removeFprintFrame);
    }
    
    function removeFprintFrame(timestamp) {
      if (timestamp - lastRafCallTimestamp >= 1000 / 65) {
        curFprintPathsOffset += fprintTick * fprintProgressionDirection;
        offsetFprintPathsByHalves(curFprintPathsOffset);
        lastRafCallTimestamp = timestamp;
      }
      if (curFprintPathsOffset >= -1)
        window.requestAnimationFrame(removeFprintFrame);
      else {
        curFprintPathsOffset = -1;
        offsetAllFprintPaths(curFprintPathsOffset);
      }
    }
    
    function offsetAllFprintPaths(ratio) {
      fprintPaths.forEach(path => path.offset(ratio));
    }
    
    function offsetFprintPathsByHalves(ratio) {    
      fprintPathsFirstHalf.forEach(path => path.offset(ratio));
      fprintPathsSecondHalf.forEach(path => path.offset(-ratio));
    }
    
    $screen.on('mousedown touchstart', function() {
      fprintProgressionDirection = 1;
      if (!isFprintAnimationInProgress && !isFprintAnimationOver)
        window.requestAnimationFrame(fprintFrame);
    })
    
    $(document).on('mouseup touchend', function() {
      fprintProgressionDirection = -1;
      if (!isFprintAnimationInProgress && !isFprintAnimationOver)
        window.requestAnimationFrame(fprintFrame);
    });
  });
  
  
  function getPropertyIncrement(startValue, endValue, transitionDuration) {
      const TICK_TIME = 1000 / 60;
      const ticksToComplete = transitionDuration / TICK_TIME;
      return (endValue - startValue) / ticksToComplete;
  }
  
  class Path {
    constructor(selector, index) {
      this.index = index;
      this.querySelection = document.querySelectorAll(selector)[index];
      this.length = this.querySelection.getTotalLength();
      this.$ = $(selector).eq(index);
      this.setDasharray();
      this.removesForwards = this.$.hasClass('demo__fprint-path--removes-forwards');
    }
    
    setDasharray() {
      this.$.css('stroke-dasharray', `${this.length} ${this.length + 2}`);
      return this;
    }
    
    offset(ratio) {
      this.$.css('stroke-dashoffset', -this.length * ratio + 1);
      return this;
    }
    
    makeVisible() {
      this.$.css('visibility', 'visible');
      return this;
    }
  }