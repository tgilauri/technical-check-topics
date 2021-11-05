const main = () => {
  const myWindow = document.getElementById('window');
  const header = document.getElementById('header');
  const dragRight = document.getElementById('dragRight');
  const dragBottom = document.getElementById('dragBottom');
  const dragSE = document.getElementById('dragSE');

  console.log(header);

  let fullScreen = false;

  let dragRightClicked = false;
  let dragBottomClicked = false;

  let clickedDown = false;
  let clickedOffsetX = 0;
  let clickedOffsetY = 0;

  const DEFAULT_SIZE = 400;

  const position = {
    top: 0,
    left: 0,
  };

  const size = {
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
  };

  const fullScreenResize = () => {
    header.addEventListener('dblclick', (_) => {
      fullScreen = !fullScreen;
      myWindow.dispatchEvent(new Event('fullscreen'));
    });

    myWindow.addEventListener('fullscreen', (event) => {
      console.log(event);
      console.log(size);
      console.log('fullscreen', fullScreen);
      if (fullScreen) {
        myWindow.style.width = `${window.innerWidth}px`;
        myWindow.style.height = `${window.innerHeight}px`;
        myWindow.style.top = 0;
        myWindow.style.left = 0;
      } else {
        myWindow.style.width = `${size.width}px`;
        myWindow.style.height = `${size.height}px`;
        myWindow.style.top = `${position.top}px`;
        myWindow.style.left = `${position.left}px`;
      }
    });
  };

  const resizeWindow = () => {
    const onMousemove = (event) => {
      if (fullScreen) return;
      if (!dragRightClicked && !dragBottomClicked) return;
      if (dragRightClicked) {
        let width = event.clientX - myWindow.offsetLeft;
        if (event.clientX >= window.innerWidth) {
          width = window.innerWidth - myWindow.offsetLeft;
        }
        size.width = width;
      }
      if (dragBottomClicked) {
        let height = event.clientY - myWindow.offsetTop;
        if (height > event.clientY >= window.innerHeight) {
          height = window.innerHeight - myWindow.offsetTop;
        }
        size.height = height;
      }
      myWindow.dispatchEvent(new Event('windowResize'));
    };

    dragRight.addEventListener('mousedown', () => {
      if (fullScreen) return;
      dragRightClicked = true;
    });
    dragBottom.addEventListener('mousedown', () => {
      if (fullScreen) return;
      dragBottomClicked = true;
    });
    dragSE.addEventListener('mousedown', () => {
      if (fullScreen) return;
      dragRightClicked = true;
      dragBottomClicked = true;
    });

    myWindow.addEventListener('windowResize', (_) => {
      const { width, height } = size;
      myWindow.style.width = `${width}px`;
      myWindow.style.height = `${height}px`;
    });

    document.addEventListener('mouseup', () => {
      if (dragRightClicked) {
        dragRightClicked = false;
      }
      if (dragBottomClicked) {
        dragBottomClicked = false;
      }
    });
    document.addEventListener('mousemove', onMousemove);

    myWindow.dispatchEvent(new Event('windowResize'));
  };

  const moveWindow = () => {
    const handleMouseMove = (event) => {
      if (!clickedDown || fullScreen) return;

      const { clientX, clientY } = event;

      let positionX = clientX - clickedOffsetX;
      let positionY = clientY - clickedOffsetY;
      if (positionX <= 0) {
        positionX = 0;
      }
      if (positionY <= 0) {
        positionY = 0;
      }

      if (positionX >= window.innerWidth - myWindow.clientWidth) {
        positionX = window.innerWidth - myWindow.clientWidth;
      }
      if (positionY >= window.innerHeight - myWindow.clientHeight) {
        positionY = window.innerHeight - myWindow.clientHeight;
      }
      position.top = positionY;
      position.left = positionX;

      header.dispatchEvent(new Event('windowMove'));
    };

    header.addEventListener('windowMove', (_) => {
      const { left, top } = position;
      myWindow.style.top = `${top}px`;
      myWindow.style.left = `${left}px`;
    });

    header.addEventListener('mousedown', (e) => {
      if (fullScreen) return;
      clickedDown = true;
      clickedOffsetX = e.offsetX;
      clickedOffsetY = e.offsetY;
    });

    document.addEventListener('mouseup', () => {
      if (clickedDown) {
        clickedDown = false;
        clickedOffsetX = 0;
        clickedOffsetY = 0;
      }
    });

    document.addEventListener('mousemove', handleMouseMove);

    header.dispatchEvent(new Event('windowMove'));
  };

  moveWindow();
  resizeWindow();
  fullScreenResize();
};

document.addEventListener('DOMContentLoaded', main);
