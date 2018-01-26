---
id: titanic
title: Titanic Survivors
date: 2018-01-25
due-date: 2018-02-01
difficulty: Easy
type: Classification (Binary)
score-order: default
---

# Background

The sinking of the RMS Titanic is one of the deadliest maritime tragedies.
During her maiden voyage, the Titanic sank after colliding with an iceberg,
killing 1502 out of 2224 passengers and crew. Amongst others, one of the main
reasons for the large number of casualties was the lack of lifeboats. Although
there was some luck involved, policies like ``women and children first '' meant
that some groups of people were more likely to survive than others.


In this challenge, your goal is to predict which passengers survived the
tragedy.

# Input Data

The input data is a csv file with passenger information as follows:

```
| Variable | Definition                        | Notes                                    |  
| -------- | ----------------------------      | ------                                   |  
| survival | whether a passenger survived      | 0 = no, 1 = yes; not present in test set |  
| pclass   | ticket class                      | could be 1, 2, 3                         |  
| sex      | sex                               |                                          |  
| Age      | age in years                      |                                          |  
| sibsp    | # of siblings / spouses on board  |                                          |  
| parch    | # of parents / children on board  |                                          |  
| ticket   | ticket number                     |                                          |  
| fare     | ticket fare                       |                                          |  
| cabin    | cabin number                      |                                          |  
| embarked | port of embarkation               | C=Cherbourg, Q=Queenstown, S=Southampton |  
```

# Scoring

Your score for this challenge will be the percentage of correct predictions on
the test set, rounded to nearest 10th of a percent (same scores post-rounding
will be tied).

# [Download Starter Files](https://drive.google.com/file/d/1lWi9uEYfIbc1m_PnPQJcPWBe9XzSHqCU/view?usp=sharing)
