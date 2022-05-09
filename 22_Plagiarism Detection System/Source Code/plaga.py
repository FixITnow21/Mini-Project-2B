from struct import pack
from tkinter import *
from difflib import SequenceMatcher
import os
from tkinter.messagebox import showerror, showinfo
from tkinter.filedialog import askopenfilename
import matplotlib.pyplot as plt

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from wordcloud import WordCloud


dict1 = {}

def openNewWindow(resdict, testdata):
    class WordCloudGeneration:
        def preprocessing(self, data):
            data = [item.lower() for item in data]
            stop_words = set(stopwords.words('english'))
            paragraph = ' '.join(data)
            word_tokens = word_tokenize(paragraph) 
            preprocessed_data = ' '.join([word for word in word_tokens if not word in stop_words])
            # print("\n Preprocessed Data: " ,preprocessed_data)
            return preprocessed_data

        def create_word_cloud(self, final_data):
            wordcloud = WordCloud(width=1600, height=800, max_font_size=200, background_color="black").generate(final_data)
            plt.figure(figsize=(12,10))
            plt.imshow(wordcloud)
            plt.axis("off")
            plt.show()

    wordcloud_generator = WordCloudGeneration()
    input_text = testdata
    input_text = input_text.split('.')
    clean_data = wordcloud_generator.preprocessing(input_text)
    wordcloud_generator.create_word_cloud(clean_data)

    newWindow = Toplevel(root)
    newWindow.title("Result")
    newWindow.geometry("900x600")
    sb = Scrollbar(newWindow)
    sb.pack(side = RIGHT, fill = Y)
    mylist = Listbox(newWindow, width=600, height=100, yscrollcommand = sb.set)
 
    sorted_dt = dict(sorted(dict1.items(), key=lambda item: item[1], reverse=True))
    textres = Label(newWindow, text="", font="luida 20")
    textres.pack()
    max = list(sorted_dt.values())[0]
    if max>=60:
        pglvl = "Level 3 Plagiarism (>60%)"
        print("Level 3 Plagiarism (>60%)")
    elif(40<max>=60):
        pglvl = "Level 2 Plagiarism (40-60%)"
        print("Level 2 Plagiarism (40-60%)")
    elif(10<max>=40):
        pglvl = "Level 1 Plagiarism (10-40%)"
        print("Level 1 Plagiarism (10-40%)")
    else:
        pglvl = "Level 0 Plagiarism (<10%)"
        print("Level 0 Plagiarism (<10%)")
    
    textres["text"] = pglvl
    
    mylist.insert(END, "File Name                                   Percentage")
    mylist.insert(END, "")
    for i, j in sorted_dt.items():
        mylist.insert(END, f"{i}  -  {j}%")
    
    
    mylist.pack()
    sb.config(command = mylist.yview)

def openf():
    test_ = askopenfilename(defaultextension=".txt", filetypes=[("All Files", "*.*"), ("Txt Documents", "*.*")])
    if test_ == "":
        showerror("Error", "Select a File")
    else:
        student_files = [doc for doc in os.listdir("dataset") if doc.endswith('.txt')]
        for files in student_files:
            with open(files, encoding="utf-8") as train, open(test_, encoding="utf-8") as testdata:
                train_data = train.read()
                test_data = testdata.read()
                matches = SequenceMatcher(None, train_data, test_data).ratio()
                matches=matches*100
                matches = round(matches, 2)
                print(f"The Plagarised Content in {files} is {matches} %.")
                dict1[files]=matches
        
        openNewWindow(dict1, test_data)
    

def about():
    showinfo("About", "Made by Abhay, Aditya and Bharat")

def reset_():
    screen.delete("1.0", END)

def wordcounter(event):
    a = str(len(screen.get("1.0", "end")) - 1)
    word_counter['text'] = a

def compare_():
    student_files = [doc for doc in os.listdir("dataset") if doc.endswith('.txt')]

    for files in student_files:
        with open(files, encoding="utf-8") as train:
            train_data = train.read()
            test_data = screen.get("1.0", "end")
            matches = SequenceMatcher(None, train_data, test_data).ratio()
            matches=matches*100
            matches = round(matches, 2)
            print(f"The Plagarised Content in {files} is {matches} %.")
            dict1[files]=matches

    openNewWindow(dict1, test_data)

    

root = Tk()
root.title("Plagarism Detector")
root.geometry("1044x655")


menubar = Menu(root)
filemenu = Menu(menubar, tearoff=0)
filemenu.add_command(label="Open", command=openf)
menubar.add_cascade(label="File", menu=filemenu)

aboutmenu = Menu(menubar, tearoff=0)
aboutmenu.add_command(label="About", command=about)
menubar.add_cascade(label="About", menu=aboutmenu)

wcount=0
plaga = Label(root, width=20, height=1, text="Plagarism Detector", font="Lucida 20 bold", bg="orange")
plaga.pack(fill=X)

instruction = Label(root, height=1, width=23, text="Insert your text here", font="lucida 15")
instruction.pack(anchor=W, fill=X)

screen = Text(root, height=14, font="lucida 15", bg="white")
screen.pack(padx=40, fill=BOTH, ipady=300)
screen.bind("<KeyPress>", wordcounter)

scroll = Scrollbar(screen)
scroll.pack(side=RIGHT, fill=Y)
scroll.config(command=screen.yview)
screen.config(yscrollcommand=scroll.set)

word_counter = Label(root, text=0, font="lucida 10")
word_counter.pack(anchor=W, padx=40)

submit_button = Button(root, text="Submit", font="lucida 15 bold", command=compare_)
submit_button.place(x=660, y=720)

reset_button = Button(root, text="Reset", command=reset_, font="lucida 15 bold")
reset_button.place(x=770, y=720)


root.config(menu=menubar)
root.mainloop()