import pandas
from scipy.spatial.distance import cdist, cosine
import numpy as np
from heapq import *

def dist(m1, m2):
    res = 0
    color_weight = 0.1
    director_weight = 3
    actor_weight = 3
    genre_weight = 0.2
    plot_weight = 0.2
    language_weight = 0.1
    country_weight = 0.1
    metrics_weight = 2

    # color
    if m1[0] == m2[0]:
        res += color_weight

    # director name
    if m1[1] == m2[1]:
        res += director_weight

    actors_1, actors_2 = set([m1[6], m1[10], m1[14]]), set([m2[6], m2[10], m2[14]])
    res += actor_weight * len(actors_1 & actors_2)

    genres_1, genres_2 = set(str(m1[9]).split('|')), set(str(m2[9]).split('|'))
    res += genre_weight * len(genres_1 & genres_2)

    plot_1, plot_2 = set(str(m1[16]).split('|')), set(str(m2[16]).split('|'))
    res += plot_weight * len(plot_1 & plot_2)

    # language
    if m1[19] == m2[19]:
        res += language_weight

    # country
    if m1[20] == m2[20]:
        res += country_weight

    # num_critic_for_reviews, duration, gross, num_voted_users, num_user_for_reviews, title_year, imdb_score
    v1 = np.nan_to_num(np.array([m1[2], m1[3], m1[8], m1[12], m1[18], m1[23], m1[25]]))
    v2 = np.nan_to_num(np.array([m2[2], m2[3], m2[8], m2[12], m2[18], m2[23], m2[25]]))

    res += metrics_weight * (1 + cosine(v1, v2))

    return res

def process_csv():
    data = pandas.read_csv('movie_metadata.csv')
    raw_data = data.copy()

    cols_to_norm = ['num_critic_for_reviews', 'duration', 'gross', 'num_voted_users', 'num_user_for_reviews', 'title_year', 'imdb_score']
    data[cols_to_norm] = data[cols_to_norm].apply(lambda x: (x - x.mean()) / (x.max() - x.min()))
    data['movie_title'] = data['movie_title'].apply(lambda x: x.replace("\xc2\xa0", " ").strip())
    raw_data['movie_title'] = data['movie_title'].apply(lambda x: x.replace("\xc2\xa0", " ").strip())
    data = data.as_matrix()

    titles = {d[16]: i for i, d in enumerate(data)}
    distances = [[0] * len(data) for _ in xrange(len(data))]

    return raw_data.as_matrix(), data, distances, titles

def get_results(ids, k, raw_data, data, distances, already_calced, titles):
    h = []

    for idx in ids:
        for i in xrange(len(distances[idx])):
            if i != idx:
                if idx not in already_calced:
                    distances[idx][i] = dist(data[idx], data[i])
                heappush(h, (-distances[idx][i], i))

        already_calced.add(idx)

    res = []
    attrs = ['color',
            'director_name',
            'num_critic_for_reviews',
            'duration',
            'director_facebook_likes',
            'actor_3_facebook_likes',
            'actor_2_name',
            'actor_1_facebook_likes',
            'gross',
            'genres',
            'actor_1_name',
            'movie_title',
            'num_voted_users',
            'cast_total_facebook_likes',
            'actor_3_name',
            'facenumber_in_poster',
            'plot_keywords',
            'movie_imdb_link',
            'num_user_for_reviews',
            'language',
            'country',
            'content_rating',
            'budget',
            'title_year',
            'actor_2_facebook_likes',
            'imdb_score',
            'aspect_ratio',
            'movie_facebook_likes']

    for i in xrange(k):
        d, idx = heappop(h)
        # res.append({attrs[i]: raw_data[idx][i] for i in xrange(len(list(raw_data[idx])))})
        res.append(idx)
    return res
