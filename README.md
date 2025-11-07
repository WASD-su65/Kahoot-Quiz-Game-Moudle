# Kahoot-Quiz-Game-Moudle
Creator : Poomipat Jitkrongsit
Eng : A web-based quiz game inspired by Kahoot, designed for both hosts and players to join interactive question-and-answer sessions. The main goal is to get the highest score by answering questions correctly and as fast as possible.
TH : โปรเจกต์นี้เป็นระบบเกมแบบ Quiz (แบบคล้าย Kahoot) ที่อาศัยไฟล์ JSON หรือข้อมูลคำถาม / คำตอบ เพื่อให้ผู้เล่นตอบคำถามและทำคะแนนให้ได้สูงสุด ผู้เล่นสามารถแข่งขันกันหรือเล่นแบบเดี่ยวก็ได้
วัตถุประสงค์คือ:
- สร้างเกมที่เข้าใจง่าย – สามารถตั้งคำถาม-ตอบได้ทันที
- รองรับการใช้งานในเว็บ (HTML / CSS / JS)
- มีรูปแบบให้ผู้เล่นเข้าร่วมและโฮสต์เกมได้

# 🛠️ Feature / คุณสมบัติหลัก
**ENG** :

- 🎮 Separate **Host** and **Player** interfaces
- ⚙️ Load custom questions from a JSON file
- 🧠 Real-time question flow and answer validation
- 🧾 Score system based on accuracy and response time
- 🔊 Integrated sound effects (via **sounds.js**)
- 💡 Simple front-end implementation — no backend required

**TH** :

- โหลดชุดคำถาม / คำตอบจากไฟล์ JSON (ตัวอย่าง sample-questions.json)
- หน้าผู้เล่น (Player) และหน้าผู้โฮสต์ (Host) แยกกันชัดเจน
- สมัครเข้าร่วมเกมแบบออนไลน์ (ผ่านหน้า quick_join.html)
- เกมมีระบบให้คะแนน และแสดงผู้ชนะเมื่อจบเกม
- รองรับการรวมเสียงประกอบ (ไฟล์ sounds.js) เพื่อเพิ่มความน่าสนใจ

# 📁 Project Structure
**File / Folder**
<pre>index.html</pre>
<pre>index_new.html</pre>
<pre>host_lobby.html, host_game.html, host_new.html</pre>
<pre>player.html, player_game.html, player_new.html</pre>
<pre>quick_join.html</pre>
<pre>sample-questions.json</pre>
<pre>sounds.js</pre>
<pre>index.css, player.css</pre>

**Description**
- Main menu or home page
- Alternate start page
- Pages for game hosts
- Pages for players
- Quick join page for players
- Example quiz data file
- Manages background music and sound effects
- Stylesheets for UI

**ไฟล์**
<pre>index.html / index_new.html</pre>
<pre>host_lobby.html, host_game.html, host_new.html</pre>
<pre>player.html, player_game.html, player_new.html</pre>
<pre>quick_join.html</pre>
<pre>sample-questions.json</pre>
<pre>sounds.js</pre>
<pre>index.css, player.css</pre>

**คำอธิบาย**
– หน้าเมนูหลัก / โฮสต์เกม
– หน้าสำหรับโฮสต์เกม
– หน้าสำหรับผู้เล่น
– หน้าเข้าร่วมเกมอย่างรวดเร็ว
– ไฟล์ตัวอย่างคำถาม
– ไฟล์จัดการเสียงประกอบในเกม
– ไฟล์สไตล์สำหรับ UI

# 🚀 Getting Started / วิธีเริ่มใช้งาน
**1. Clone the repository**
<pre>git clone https://github.com/WASD-su65/Kahoot-Quiz-Game-Moudle.git</pre>

**2. Open the project folder**
<pre>cd Kahoot-Quiz-Game-Moudle</pre>

**3. Run the game locally**
Simply open **index.html** or **host_new.html** in your web browser.

**4. (Optional) Customize your questions**
Edit the **sample-questions.json** file with your own quiz data:
<pre>[
  {
    "question": "What is the capital of France?",
    "choices": ["Paris", "London", "Berlin", "Rome"],
    "answer": "Paris"
  }
]</pre>

**1.ดาวน์โหลดหรือ clone รีโพจิทอรีนี้:**
<pre>git clone https://github.com/WASD-su65/Kahoot-Quiz-Game-Moudle.git</pre>

**2.เข้าโฟลเดอร์โปรเจกต์:**
<pre>cd Kahoot-Quiz-Game-Moudle</pre>

**3.เปิดไฟล์ **index.html** (หรือไฟล์หน้าโฮสต์/ผู้เล่นที่เหมาะสม) ในเว็บเบราว์เซอร์ของคุณ**

**4.ถ้าต้องการใช้ชุดคำถามของคุณเอง ให้เปิดไฟล์ **sample-questions.json** และแก้ไขเนื้อหาตามรูปแบบ:**
<pre>[  
  {  
    "question": "Your question here?",  
    "choices": ["choice1","choice2","choice3","choice4"],  
    "answer": "choice2"  
  },  
  …  
] </pre>

**5.เริ่มเกมได้เลย! ผู้โฮสต์สร้างเกม ผู้เล่นเข้าร่วมหรือเล่นเองได้**

# 🕹️ How to Play / วิธีเล่น
**Host:**
1. Open host_new.html
2. Create a quiz session
3. Wait for players to join

**Player:**
1. Open player.html or quick_join.html
2. Enter the game code shared by the host
3. Answer questions as they appear

**Goal:**
Earn points by answering correctly and faster than other players.
At the end of the game, the player with the highest score wins!

- โฮสต์: เปิดหน้า host_new.html ตั้งชื่อเกมและรอผู้เล่นเข้าร่วม
- ผู้เล่น: เปิด player.html หรือ quick_join.html แล้วใส่รหัสเกมที่โฮสต์สร้าง
- เมื่อเริ่มเกม ระบบจะโหลดชุดคำถามจากไฟล์ JSON ทีละข้อ ผู้เล่นเลือกคำตอบ
- คะแนนจะถูกคำนวณตามเวลาการตอบและความถูกต้อง ผู้ที่มีคะแนนสูงสุดจะเป็นผู้ชนะ

# 🧩 Contributing / การมีส่วนร่วม
- **Frontend**: HTML, CSS, JavaScript
- **Data Source**: JSON (static or fetched)
- **Sound Integration**: JavaScript (Audio() API)

-Fork รีโพจิทอรีนี้
-สร้าง branch ใหม่ (feature/your-feature)
-ทำการแก้ไขและทดสอบให้เรียบร้อย
-ส่ง Pull Request พร้อมอธิบายรายละเอียดของการเปลี่ยนแปลง

# 📄 License / ใบอนุญาต
This project is **free to use** for personal and educational purposes.
If you modify or redistribute it, please provide proper credit to the original creator.

โปรเจกต์นี้เปิดให้ใช้งานแบบฟรี (Free to use) แต่หากต้องการใช้เชิงพาณิชย์ หรือดัดแปลงอย่างมาก ขอให้เครดิตผู้พัฒนาเดิมไว้ด้วย

# 🙋 Contact / ติดต่อ
หากมีคำถาม / ปัญหา / ข้อเสนอแนะ สามารถติดต่อผู้พัฒนาได้ผ่านหน้า GitHub ของโปรเจกต์นี้
