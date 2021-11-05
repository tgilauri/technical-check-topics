function resizeWindow() {
  const myWindow = document.getElementById('window');
  const dragRight = document.getElementById('dragRight');
  const dragBottom = document.getElementById('dragBottom');
  const dragSE = document.getElementById('dragSE');
  let dragRightClicked = false;
  let dragBottomClicked = false;

  const onMousemove = (event) => {
    if (!dragRightClicked && !dragBottomClicked) return;
    if (dragRightClicked) {
      let width = event.clientX - myWindow.offsetLeft;
      if (event.clientX >= window.innerWidth) {
        width = window.innerWidth - myWindow.offsetLeft;
      }
      myWindow.style.width = `${width}px`;
    }
    if (dragBottomClicked) {
      let height = event.clientY - myWindow.offsetTop;
      if (height > event.clientY >= window.innerHeight) {
        height = window.innerHeight - myWindow.offsetTop;
      }
      myWindow.style.height = `${height}px`;
    }
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

  document.addEventListener('mouseup', () => {
    if (dragRightClicked) {
      dragRightClicked = false;
    }
    if (dragBottomClicked) {
      dragBottomClicked = false;
    }
  });
  document.addEventListener('mousemove', onMousemove);
}

function moveWindow() {
  const myWindow = document.querySelector('#window');
  const header = document.querySelector('#header');
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

    myWindow.style.top = `${positionY}px`;
    myWindow.style.left = `${positionX}px`;
  };

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
}

document.addEventListener('DOMContentLoaded', moveWindow);
document.addEventListener('DOMContentLoaded', resizeWindow);
