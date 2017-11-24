---
id: mnist 
title: Handwritten Digit Recognition
date: 2017-11-24
due-date: 2017-12-08
difficulty: Medium
type: Classification (Multi-Class)
score-order: reverse
---

# Background

The MNIST dataset is a large database of handwritten digits that is commonly 
used for training various image processing systems. The MNIST database contains
60,000 training images and 10,000 testing images.

MNIST is often used a "hello world" dataset to benchmark novel image 
classification algorithms. So feel free to get creative and try something
new!

# Input Data

Each input sample is a 28x28 matrix depicting a handwritten digit. In 
starter.py, you\'ll find code that loads in the data for you (therefore
allowing you to focus on the interesting stuff). 

# Scoring

Your score for this challenge will be the test error rate, the percentage of
test samples that you get wrong. 

You should be able to get < 10% error rate easily. You should aim for a score
of < 1% error rate, or if you\'re feeling exceptionally ambitious, a score of 
< 0.5%.
