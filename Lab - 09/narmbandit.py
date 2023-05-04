import random
import matplotlib.pyplot as plt
import numpy as np
from operator import add

import random


class Bandit(object):
    def __init__(self, arms):
        self.arms = arms
        rewards = [1]*10
        self.rewards = rewards

    def actions(self):
        return list(range(0, self.arms))

    def reward(self, action):
        prob = []
        for i in range(self.arms):
            prob.append(0.1*i)
        if (random.random() < prob[action]):
            return 1
        else:
            return 0

    def nonStatReward(self, action):
        s = np.random.normal(0, 0.01, self.arms)
        self.rewards = list(map(add, self.rewards, s))
        return self.rewards[action]


def eGreedy(bandit, epsilon, max_iteration=1000, method=1):
    Q = [0]*bandit.arms
    count = [0]*bandit.arms
    epsilon = epsilon
    r = 0
    R = []
    R_avg = [0]*1
    max_iter = max_iteration
    for iter in range(1, max_iter):
        if random.random() > epsilon:
            action = Q.index(max(Q))
        else:
            action = random.choice(bandit.actions())
        if (method == 1):
            r = bandit.reward(action)
        else:
            r = bandit.nonStatReward(action)
        R.append(r)
        count[action] = count[action]+1
        Q[action] = Q[action]+(r - Q[action]) / count[action]
        R_avg.append(R_avg[iter-1] + (r-R_avg[iter-1])/iter)
    print(count)

    return Q, R_avg, R


def modeGreedy(bandit, epsilon, max_iteration, method=1, alpha=0.7):
    Q = [0]*bandit.arms
    count = [0]*bandit.arms
    epsilon = epsilon
    r = 0
    R = []
    R_avg = [0]*1
    max_iter = max_iteration
    for iter in range(1, max_iter):
        if random.random() > epsilon:
            action = Q.index(max(Q))
        else:
            action = random.choice(bandit.actions())
        if (method == 1):
            r = bandit.reward(action)
        else:
            r = bandit.nonStatReward(action)
        R.append(r)
        count[action] = count[action]+1
        Q[action] = Q[action]+(r - Q[action])*alpha
        R_avg.append(R_avg[iter-1] + (r-R_avg[iter-1])/iter)

    return Q, R_avg, R


bandit = Bandit(10)
Q, R_avg, R = eGreedy(bandit, 0.2, 10000, 2)
Q1, R_avg1, R1 = modeGreedy(bandit, 0.2, 10000, 2)
plt.plot(R)
plt.plot(R_avg1)
plt.xlabel("Step count")
plt.ylabel("Average reward")
