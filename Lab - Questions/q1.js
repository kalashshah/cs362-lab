class MyNode {
  next;
  val;
  constructor(val) {
    this.next = null;
    this.val = val;
  }
}

class Random {
  randoms;

  constructor() {
    this.randoms = [];
    for (let i = 0; i < 10000000; i++) {
      this.randoms.push(Math.random() * 1000000);
    }
  }

  getRandoms() {
    return this.randoms;
  }
}

class State {
  s1;
  s2;
  s3;
  s4;
  s5;
  s6;
  s7;
  s8;
  s9;
  s10;

  constructor() {
    this.s1 = new MyNode(100);
    this.s2 = new MyNode(500);
    this.s3 = new MyNode(1000);
    this.s4 = new MyNode(5000);
    this.s5 = new MyNode(10000);
    this.s6 = new MyNode(50000);
    this.s7 = new MyNode(100000);
    this.s8 = new MyNode(500000);
    this.s9 = new MyNode(1000000);
    this.s10 = new MyNode(5000000);
    this.s1.next = this.s2;
    this.s2.next = this.s3;
    this.s3.next = this.s4;
    this.s4.next = this.s5;
    this.s5.next = this.s6;
    this.s6.next = this.s7;
    this.s7.next = this.s8;
    this.s8.next = this.s9;
    this.s9.next = this.s10;
  }
}

class Iteration {
  stopper;
  timesVisited;
  valueFunction;
  head;
  gamma;
  theta;
  prob;
  randoms;
  itr;
  cnt;

  constructor() {
    const obj = new State();
    this.head = obj.s1;
    const obj1 = new Random();
    this.randoms = obj1.getRandoms();
    this.timesVisited = new Map();
    this.valueFunction = new Map();
    this.gamma = 0.9;
    this.theta = 0.0001;
    this.prob = [1, 0.99, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0];
    this.itr = 0;
    this.cnt = 0;
  }

  printStateTransition() {
    for (const it of this.timesVisited.keys()) {
      console.log(it);
    }
    console.log("\n");
    for (const it of this.timesVisited.keys()) {
      console.log((it * 100) / this.cnt);
    }
    console.log("\n");
  }

  getStopperState() {
    return this.stopper;
  }

  dfs(temp, currState) {
    if (temp === null) return;
    const val = this.timesVisited.get(currState) || 0;
    this.timesVisited.set(currState, val + 1);
    if (!temp) {
      return [currState, 0];
    }
    let maxStateReached = currState;
    let answerReward = 0;
    const oldValue = this.valueFunction.get(currState) || 0;
    const quitReward = this.valueFunction.get(currState - 1) || 0;
    let nextStateReward;
    if (this.randoms[this.itr++ % 10000000] <= this.prob[currState]) {
      nextStateReward = this.dfs(temp.next, currState + 1);
      answerReward =
        this.prob[currState] * (this.gamma * nextStateReward[1] + temp.val);
      maxStateReached = Math.max(maxStateReached, nextStateReward[0]);
      const val1 = this.timesVisited.get(currState) || 0;
      const val2 = this.valueFunction.get(currState) || 0;
      this.valueFunction.set(
        currState,
        (val2 * val1 + answerReward) / (val1 + 1)
      );
      if (Math.abs(oldValue - val2) < this.theta) {
        this.stopper = true;
      }
    }
    return [maxStateReached, Math.max(quitReward, answerReward)];
  }

  cycle() {
    this.cnt++;
    return this.dfs(this.head, 1);
  }
}

class Solution {
  itr;
  mp;

  constructor() {
    this.itr = 0;
    this.mp = new Map();
  }

  solve() {
    if (this.mp === null) return;
    const obj = new Iteration();
    while (!obj.getStopperState()) {
      console.log(this.itr);
      const temp = obj.cycle();
      const val = this.mp.get(temp[0]) || 0;
      this.mp.set(temp[0], val + 1);
      this.itr++;
    }

    console.log(this.itr);
    obj.printStateTransition();
  }

  print() {
    const pr = [];
    for (const it of this.mp.keys()) {
      pr.push(it);
    }
    pr.sort();
    for (const it of pr) {
      console.log(it - 1);
    }
    console.log("\n");
    for (const it of pr) {
      console.log((it * 100) / this.itr);
    }
    console.log("\n");
  }
}

const solver = new Solution();
solver.solve();
solver.print();
