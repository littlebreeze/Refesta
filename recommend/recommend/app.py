import pymysql
import random
from flask import Flask, request

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def receive_string():

    userid = request.form.get('userId')

    conn = pymysql.connect(host='refesta.cvguu484gky1.ap-northeast-2.rds.amazonaws.com', user='root', password='!#%refesta', db='refesta', charset='utf8')

    cur = conn.cursor()
    cur.execute("SELECT * FROM member WHERE id = %s", (userid,))
    row = cur.fetchone()
    if row is None:
        return "유저가없다"
    # Here
    cur.execute("SELECT COUNT(*) FROM festival")
    festivalN = cur.fetchone()[0]
    fl = list(range(1, festivalN + 1))
    random.shuffle(fl)

    cur.execute("DELETE FROM member_festival WHERE member_id = %s", (userid,))
    conn.commit()
    for i in fl:
        cur.execute("INSERT INTO member_festival (member_id, festival_id) VALUES (%s, %s)", (userid, str(i)))
    conn.commit()

    cur.execute("SELECT DISTINCT artist_id FROM festival_lineup")
    al=[]
    arlist = cur.fetchall()
    for i in arlist:
        al.append(i[0])
    random.shuffle(al)
    cur.execute("DELETE FROM member_artist WHERE member_id = %s", (userid,))
    conn.commit()
    for i in al:
        cur.execute("INSERT INTO member_artist (member_id, artist_id) VALUES (%s, %s)", (userid, str(i)))
    conn.commit()
    return "추천 완료"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8082)