import os
import numpy as np
import csv
import zipfile

DIR = os.path.dirname(os.path.realpath(__file__))

def evaluate(path):
    test_labels = [line for line in csv.reader(open(os.path.join(DIR, 'test_labels.csv')), delimiter=' ')]
    pred_labels = [line for line in csv.reader(open(path), delimter=' ')]

    assert len(test_labels) == len(pred_labels), "Must have correct number of samples"
    score = 0.0
    n = 0

    for i in range(len(test_labels)):
        test_sent = test_labels[i]
        pred_sent = pred_labels[i]

        assert len(test_sent) == len(pred_sent), "Must have correct number of words"

        for j in range(len(test_sent)):
            if test_sent[j] == pred_sent[j]:
                score += 1.0
            n += 1

    score = score / n

    return int(score * 100)/100
