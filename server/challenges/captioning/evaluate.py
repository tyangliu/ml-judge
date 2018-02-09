import json

from collections import defaultdict
from nltk import word_tokenize

from nltk.translate.bleu_score import sentence_bleu

test_captions = json.load(open("test_captions_ans.json"))

id_to_caption = defaultdict(list)
for entry in test_captions['annotations']:
  id_to_caption[entry['image_id']].append(entry['caption'])

train_ids = [496718, 300323, 16593, 157046, 519193, 240434, 384527, 398209, 573784, 568041, 355450, 390350, 154342, 206800, 350416, 534656, 478721, 52340, 10496, 250912, 236567, 155319, 285250, 217951, 381247, 14557, 130524, 514529, 38714, 33759, 196885, 98287, 281972, 321647, 206596, 262565, 136768, 158227, 138890, 200348, 306073, 513574, 348877, 400981, 513389, 407646, 360878, 274870, 434893, 451949, 103379, 101312, 220310, 427615, 504152, 301402, 569464, 512403, 335981, 70589, 316704, 300773, 168974, 536, 111535, 274017, 987, 552775, 376859, 203138, 455974, 540784, 20175, 578786, 202138, 394940, 37728, 1404, 296759, 435709, 439777, 526756, 498794, 111706, 312167, 162841, 391142, 133485, 373440, 237501, 227204, 138075, 561160, 215244, 15335, 134574, 572233, 418825, 560744, 74478]

captions = [id_to_caption[train_id] for train_id in train_ids]

def compute_bleu(reference_sentences, predicted_sentence):
  """
  Given a list of reference sentences, and a predicted sentence, compute the BLEU similary between them.
  """
  reference_tokenized = [word_tokenize(ref_sent.lower()) for ref_sent in reference_sentences]
  predicted_tokenized = word_tokenize(predicted_sentence.lower())
  return sentence_bleu(reference_tokenized, predicted_tokenized)

def evaluate(filename):
  outputs = [line.strip() for line in open(filename).readlines()]
  score = 0.0
  for reference,predicted in zip(captions, outputs):
    score += compute_bleu(reference, predicted)

  return 100 * score/len(outputs)
