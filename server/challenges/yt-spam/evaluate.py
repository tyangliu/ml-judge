import numpy as np
import csv
import zipfile

def evaluate(path):
    test_data = np.array([line[0] for line in csv.reader(open('test_labels.csv'))])
    pred_labels = np.array([int(e) for e in open(path)])

    assert len(test_labels) == len(pred_labels), "Must have correct number of samples"
    score = 100 * (sum(test_labels == pred_labels)/len(test_labels))

    return int(score * 100)/100
