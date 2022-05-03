from urlextract import  URLExtract
from wordcloud import WordCloud
import pandas as pd
from collections import Counter
import emoji
from nltk.sentiment.vader import SentimentIntensityAnalyzer

extractor = URLExtract()

def fetch_stats(selected_user,df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]
    #1. fetching number of messages
    num_messages = df.shape[0]
    #2. fetching number of words
    words = []
    for message in df['message']:
        words.extend(message.split())
    num_words = len(words)

    #3. fetching number of media messages
    num_media_messages = df[df['message'] == '<Media omitted>\n'].shape[0]

    #4. fecting number of link messages
    links = []
    for message in df['message']:
        links.extend(extractor.find_urls(message))
    num_links = len(links)


    return num_messages, num_words,num_media_messages,num_links

def most_busy_users(df):
    x = df['user'].value_counts().head()
    per_df = round((df['user'].value_counts()/df.shape[0])*100,2).reset_index().rename(columns={'index':'name','user':'percent'})
    return x,per_df

def create_wordcloud(selected_user,df):

    f = open('stop_hinglish.txt', 'r')
    stop_words = f.read()

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    temp = df[df['user'] != 'group_notification']
    temp = temp[temp['message'] != '<Media omitted>\n']

    def remove_stop_words(message):
        y = []
        for word in message.lower().split():
            if word not in stop_words:
                y.append(word)
        return " ".join(y)

    wc = WordCloud(width=500,height=500,min_font_size=10,background_color='white')
    temp['message'] = temp['message'].apply(remove_stop_words)
    df_wc = wc.generate(temp['message'].str.cat(sep=" "))
    return df_wc

def most_common_words(selected_user,df):

    f = open('stop_hinglish.txt','r')
    stop_words = f.read()

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    temp = df[df['user'] != 'group_notification']
    temp = temp[temp['message'] != '<Media omitted>\n']

    words = []

    for message in temp['message']:
        for word in message.lower().split():
            if word not in stop_words:
                words.append(word)

    most_common_df = pd.DataFrame(Counter(words).most_common(20))

    return most_common_df

def emoji_helper(selected_user,df):
    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    emojis = []
    for message in df['message']:
        emojis.extend([c for c in message if c in emoji.UNICODE_EMOJI['en']])

    emoji_df = pd.DataFrame(Counter(emojis).most_common(len(Counter(emojis))))

    return emoji_df

def monthly_timeline(selected_user,df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    timeline = df.groupby(['year', 'month_num', 'month']).count()['message'].reset_index()

    time = []
    for i in range(timeline.shape[0]):
        time.append(timeline['month'][i] + "-" + str(timeline['year'][i]))

    timeline['time'] = time

    return timeline

def daily_timeline(selected_user,df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    daily_timeline = df.groupby('only_date').count()['message'].reset_index()

    return daily_timeline

def week_activity_map(selected_user,df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    return df['day_name'].value_counts()

def month_activity_map(selected_user,df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    return df['month'].value_counts()

def activity_heatmap(selected_user,df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    user_heatmap = df.pivot_table(index='day_name', columns='period', values='message', aggfunc='count').fillna(0)

    return user_heatmap

def sentiment_analysis(selected_user,df):
    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    sentiments = SentimentIntensityAnalyzer()
    df["positive"] = [sentiments.polarity_scores(i)["pos"] for i in df['message']]
    df["negative"] = [sentiments.polarity_scores(i)["neg"] for i in df['message']]
    df["neutral"] = [sentiments.polarity_scores(i)["neu"] for i in df['message']]

    x = sum(df["positive"])
    y = sum(df["negative"])
    z = sum(df["neutral"])

    def sentiment_prediction(a, b, c):
        prediction=""
        if (a > b) and (a > c):
            prediction="Positive"
        if (b > a) and (b > c):
            prediction="Negative"
        if (c > a) and (c > b):
            prediction="Neutral"
        return prediction

    result=sentiment_prediction(x, y, z)
    return result