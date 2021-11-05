const main = () => {
  const myWindow = document.querySelector('#window');
  const header = document.querySelector('#header');
  const dragRight = document.querySelector('#dragRight');
  const dragBottom = document.querySelector('#dragBottom');
  const dragSE = document.querySelector('#dragSE');

  const DEFAULT_SIZE = 400;

  const position = {
    top: 0,
    left: 0,
  };

  const size = {
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
  };

  const resizeWindow = () => {
    let dragRightClicked = false;
    let dragBottomClicked = false;

    const onMousemove = (event) => {
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
      dragRightClicked = true;
    });
    dragBottom.addEventListener('mousedown', () => {
      dragBottomClicked = true;
    });
    dragSE.addEventListener('mousedown', () => {
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
    let clickedDown = false;
    let clickedOffsetX = 0;
    let clickedOffsetY = 0;

    const handleMouseMove = (event) => {
      if (!clickedDown) return;

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
};

document.addEventListener('DOMContentLoaded', main);
