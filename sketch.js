let i = 0;
let w = 10;

function setup() {
  createCanvas(800, 200);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
  }
  //frameRate(5);
  quickSort(values, 0, values.length - 1);
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);

  await Promise.all([
    await quickSort(arr, start, index - 1),
    await quickSort(arr, index + 1, end),
  ]);
}

async function partition(arr, start, end) {
  let pivotValue = arr[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      pivotIndex++;
    }
  }
  await swap(arr, pivotIndex, end);
  return pivotIndex;
}

function draw() {
  background(51);

  for (let i = 0; i < values.length; i++) {
    stroke(0);
    fill(255);
    rect(i * w, height - values[i], w, values[i]);
  }
}

async function swap(arr, a, b) {
  await sleep(25);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
