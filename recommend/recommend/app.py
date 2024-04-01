import csv
import os
import numpy as np
import random
import pymysql
from apscheduler.schedulers.background import BackgroundScheduler
from dotenv import load_dotenv
from flask import Flask, request

load_dotenv()
current_directory = os.getcwd()
DB_HOST = os.environ.get('DB_HOST')
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
app = Flask(__name__)
scheduler = BackgroundScheduler()
conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, db='refesta', charset='utf8')
cur = conn.cursor()

def save_to_csv(data, folder, filename):

    filepath = os.path.join(folder, filename)

    with open(filepath, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerows(data)

def read_from_csv(folder, filename):
    filepath = os.path.join(folder, filename)
    with open(filepath, 'r', newline='') as csvfile:
        csvreader = csv.reader(csvfile)
        data = [row for row in csvreader]
    return data

def makeusertable():
    DB_HOST = os.environ.get('DB_HOST')
    DB_USER = os.environ.get('DB_USER')
    DB_PASSWORD = os.environ.get('DB_PASSWORD')
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, db='refesta', charset='utf8')
    cur = conn.cursor()


    #1
    cur.execute("SELECT COUNT(*) from member")
    memberN = cur.fetchone()[0]

    cur.execute("SELECT member_id, genre_id FROM prefer_genre")
    membergenre = cur.fetchall()
    membergenretable = [[0 for _ in range(9)] for _ in range(memberN)]
    for i in membergenre:
        membergenretable[i[1]-1][i[0]-1]+=1;

    #2
    cur.execute("SELECT COUNT(*) from festival")
    festivalN = cur.fetchone()[0]
    lineupgenretable = [[0  for _ in range(festivalN)] for _ in range(9)]
    for i in range(festivalN):
        cur.execute(f"SELECT artist_id, genre_id FROM artist_genre WHERE artist_id IN (SELECT artist_id FROM festival_lineup WHERE festival_id = {i+1})")
        lineup = cur.fetchall()
        for j in lineup:
            lineupgenretable[j[1]-1][i]+=1

    #1+2
    memberfestivalgenretable = [[0 for _ in range(festivalN)] for _ in range(memberN)]
    for i in range(memberN):
        for j in range(festivalN):
            for k in range(9):
                memberfestivalgenretable[i][j]+=membergenretable[i][k]*lineupgenretable[k][j]

    save_to_csv(memberfestivalgenretable,'table', 'memberfestivalgenretable.csv')

    #3
    cur.execute("SELECT member_id,artist_id,is_liked FROM artist_like")
    artistlike = cur.fetchall()
    memberartistliketable = [[0 for _ in range(festivalN)] for _ in range(memberN)]
    for i in artistlike:
        cur.execute(f"select festival_id from festival_lineup where artist_id={i[1]}")
        for j in cur.fetchall():
            if not bool(int.from_bytes(i[2], byteorder='big')):
                memberartistliketable[i[0]-1][j[0]-1]-=10
            else:
                memberartistliketable[i[0]-1][j[0]-1]+=20
    for i in range(memberN):
        cur.execute(f"SELECT artist_id,preference FROM member_artist_preference where member_id={i+1}")
        for j in cur.fetchall():
            cur.execute(f"select festival_id from festival_lineup where artist_id={j[0]}")
            for k in cur.fetchall():
                memberartistliketable[i][k[0]-1]+=j[1]

    save_to_csv(memberartistliketable, 'table', 'memberartistliketable.csv')

    #4
    cur.execute("SELECT member_id,festival_id,is_liked FROM festival_like")
    memberfestivalliketable = [[0 for _ in range(festivalN)] for _ in range(memberN)]
    for i in cur.fetchall():

        if not bool(int.from_bytes(i[2], byteorder='big')):
            memberfestivalliketable[i[0]-1][i[1]-1]-=15
        else:
            memberfestivalliketable[i[0]-1][i[1]-1]+=40
    for i in range(memberN):
        cur.execute(f"SELECT festival_id,preference FROM member_festival_preference where member_id={i + 1}")
        for j in cur.fetchall():
            memberfestivalliketable[i][j[0]-1]+=j[1]

    save_to_csv(memberfestivalliketable, 'table', 'memberfestivalliketable.csv')

    #5
    cur.execute("SELECT m.member_id, m.song_id, m.preference, f.festival_id FROM member_song_preference m JOIN festival_setlist f ON m.song_id = f.song_id")
    membersongliketable = [[0 for _ in range(festivalN)] for _ in range(memberN)]
    for i in cur.fetchall():
        membersongliketable[i[0]-1][i[3]-1]+=i[2]

    save_to_csv(membersongliketable, 'table', 'membersongliketable.csv')

    #6
    cur.execute("select member_id,festival_id from review where is_deleted=0;")
    review = cur.fetchall()
    memberreviewtable = [[0 for _ in range(festivalN)] for _ in range(memberN)]
    for i in review:
        memberreviewtable[i[0]-1][i[1]-1]+=1

    save_to_csv(memberreviewtable, 'table', 'memberreviewtable.csv')

    #7
    cur.execute("SELECT member_id, festival_id FROM reservation WHERE status = 'SUCCESS'")
    reserv = cur.fetchall()
    memberreservtable = [[0 for _ in range(festivalN)] for _ in range(memberN)]

    for i in reserv:
        memberreservtable[i[0]-1][i[1]-1]=1

    save_to_csv(memberreservtable, 'table', 'memberreservtable.csv')

    #final
    finaltable = [[0 for _ in range(festivalN)] for _ in range(memberN)]
    for i in range(memberN):
        for j in range(festivalN):
            finaltable[i][j] = memberreservtable[i][j]+memberreviewtable[i][j]+membersongliketable[i][j]+memberfestivalliketable[i][j]+memberartistliketable[i][j]+memberfestivalgenretable[i][j]
    save_to_csv(finaltable, 'table', 'finaltable.csv')

def memberrecommend(member):

    cur.execute("DELETE FROM member_festival WHERE member_id = %s", (member,))
    conn.commit()

    cur.execute("DELETE FROM member_artist WHERE member_id = %s", (member,))
    conn.commit()

    finalrecommend = read_from_csv('table', 'finaltable.csv')

    sorted = np.argsort(finalrecommend[member-1])[::-1]

    for i in sorted:
        cur.execute("INSERT INTO member_festival (member_id, festival_id) VALUES (%s, %s)", (member, str(i+1)))
    conn.commit()

    recomartist=[]
    for i in sorted:
        cur.execute(f"SELECT artist_id FROM festival_lineup where festival_id = {i+1}")
        artistTemp=[]
        for j in cur.fetchall():
            artistTemp.append(j[0])
        random.shuffle(artistTemp)
        for j in artistTemp:
            if j not in recomartist:
                recomartist.append(j)
    for i in recomartist:
        cur.execute("INSERT INTO member_artist (member_id, artist_id) VALUES (%s, %s)", (member, str(i)))
    conn.commit()

@scheduler.scheduled_job('cron', day_of_week='*', hour=4)
def initialization():
    makeusertable()
    cur.execute("SELECT COUNT(*) FROM member")
    memberN = cur.fetchone()[0]
    for i in range(memberN):
        memberrecommend(i+1)
    return "추천 갱신 완료"
@app.route('/recommend', methods=['GET'])
def recommendusers():
    makeusertable()
    cur.execute("SELECT COUNT(*) FROM member")
    memberN = cur.fetchone()[0]
    for i in range(memberN):
        memberrecommend(i+1)
    return "Success initialization"

@app.route('/recommend', methods=['POST'])
def register():

    userid = request.form.get('userId')

    cur.execute("SELECT * FROM member WHERE id = %s", (userid,))
    row = cur.fetchone()
    if row is None:
        return "유저가없다"

    memberrecommend(int(userid))

    return "추천 완료"

if __name__ == '__main__':
    print("현재 작업 디렉토리:", current_directory)
    scheduler.start()
    app.run(host='0.0.0.0', port=8082)