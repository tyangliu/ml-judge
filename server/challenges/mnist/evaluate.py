import numpy as np

def evaluate(pred_csv):
    test_labels = np.array([int(e) for e in open("test_labels.csv")])
    pred_labels = np.array([int(e) for e in open(pred_csv)])

    assert len(test_labels) == len(pred_labels), "Must have correct number of samples"
    score = 100 * (1 - sum(test_labels == pred_labels)/len(test_labels))

    return int(score * 100)/100
