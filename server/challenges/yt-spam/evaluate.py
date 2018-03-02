import numpy as np
import csv
import zipfile

def evaluate(path):
    test_labels = np.array([int(line[0]) for line in csv.reader(open('challenges/yt-spam/test_labels.csv'))])
    print(test_labels)
    pred_labels = np.array([int(e) for e in open(path)])
    print(pred_labels)

    assert len(test_labels) == len(pred_labels), "Must have correct number of samples"
    score = 100 * (sum(test_labels == pred_labels)/len(test_labels))

    return int(score * 100)/100
