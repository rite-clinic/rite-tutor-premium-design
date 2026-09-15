"""Generate printable blog companions. Requires reportlab; run from the repo root."""

from pathlib import Path
import shutil
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'output/pdf'
PUBLIC = ROOT / 'public/downloads'
OUTPUT.mkdir(parents=True, exist_ok=True)
PUBLIC.mkdir(parents=True, exist_ok=True)
INK = colors.HexColor('#171717')
GRAY = colors.HexColor('#535963')
LINE = colors.HexColor('#d9dde3')
YELLOW = colors.HexColor('#FFD400')
LIGHT = colors.HexColor('#f5f6f8')
WIDTH = 528


class Resource:
    def __init__(self, filename, title, slug):
        self.filename, self.title, self.slug = filename, title, slug
        self.canvas = canvas.Canvas(str(OUTPUT / filename), pagesize=(612, 792))
        self.canvas.setTitle(title)
        self.canvas.setAuthor('Rite Tutor')
        self.canvas.setSubject('Printable companion to the Rite Tutor parent education blog')
        self.page = 0
        self.y = 0

    def text(self, text, size=10, leading=14, color=INK, bold=False, gap=8):
        style = ParagraphStyle('body', fontName='Helvetica-Bold' if bold else 'Helvetica',
                               fontSize=size, leading=leading, textColor=color)
        paragraph = Paragraph(text, style)
        _, height = paragraph.wrap(WIDTH, 700)
        assert self.y - height >= 59, (self.filename, self.page, text[:40], self.y)
        paragraph.drawOn(self.canvas, 42, self.y-height)
        self.y -= height + gap

    def start(self, subtitle):
        if self.page:
            self.finish_page()
        self.page += 1
        c = self.canvas
        c.setFillColor(YELLOW)
        c.roundRect(42, 734, 112, 24, 5, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont('Helvetica-Bold', 12)
        c.drawString(52, 742, 'RITE TUTOR')
        c.setFont('Helvetica', 9)
        c.setFillColor(GRAY)
        c.drawRightString(570, 743, 'PARENT RESOURCE  /  PRINT & COMPLETE')
        self.y = 714
        self.text(escape(self.title), size=23, leading=27, bold=True, gap=8)
        self.text(subtitle, size=10, leading=14, color=GRAY, gap=17)

    def section(self, title):
        self.text(escape(title), size=12, leading=16, bold=True, gap=9)

    def lines(self, count=1, label=None):
        if label:
            self.text(escape(label), size=9, leading=12, color=GRAY, gap=3)
        self.canvas.setStrokeColor(LINE)
        for _ in range(count):
            self.y -= 19
            assert self.y >= 59, (self.filename, self.page, 'notes overflow')
            self.canvas.line(42, self.y, 570, self.y)
        self.y -= 10

    def table(self, rows, widths, heights=None, header=True):
        style = ParagraphStyle('cell', fontName='Helvetica', fontSize=9, leading=12, textColor=INK)
        data = [[Paragraph(cell, style) for cell in row] for row in rows]
        table = Table(data, colWidths=widths, rowHeights=heights, hAlign='LEFT')
        instructions = [('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 9),
                        ('RIGHTPADDING', (0,0), (-1,-1), 9), ('TOPPADDING', (0,0), (-1,-1), 9),
                        ('BOTTOMPADDING', (0,0), (-1,-1), 9), ('GRID', (0,0), (-1,-1), .5, LINE)]
        if header:
            instructions += [('BACKGROUND',(0,0),(-1,0),YELLOW), ('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,LIGHT])]
        else:
            instructions += [('ROWBACKGROUNDS',(0,0),(-1,-1),[colors.white,LIGHT])]
        table.setStyle(TableStyle(instructions))
        _, height = table.wrap(WIDTH, 700)
        assert self.y-height >= 59, (self.filename, self.page, 'table overflow', height, self.y)
        table.drawOn(self.canvas, 42, self.y-height)
        self.y -= height+13

    def prompt(self, heading, body, notes=True):
        self.text(f'<b>{escape(heading)}</b> {escape(body)}', gap=3)
        if notes:
            self.lines()

    def finish_page(self):
        c = self.canvas
        c.setStrokeColor(LINE)
        c.line(42, 47, 570, 47)
        c.setFont('Helvetica', 8)
        c.setFillColor(GRAY)
        c.drawString(42, 32, 'Rite Tutor  |  One-to-one learning, built around your child')
        c.drawRightString(570, 32, f'{self.page} / 2')
        c.linkURL('https://www.ritetutor.com/blogs/'+self.slug, (42,26,340,44), relative=0)
        c.showPage()

    def save(self):
        assert self.page == 2
        self.finish_page()
        self.canvas.save()
        shutil.copyfile(OUTPUT/self.filename, PUBLIC/self.filename)
        print(self.filename)


def tutor_scorecard():
    r = Resource('online-tutor-parent-scorecard.pdf', 'Online Tutor Parent Scorecard', 'choose-online-tutor-parent-checklist')
    r.start('Compare up to three tutors using the seven areas from the article. Ask for examples, then record what you can verify.')
    r.text('Child / learning goal: ________________________________________________', gap=14)
    r.text('Tutor A: __________________  Tutor B: __________________  Tutor C: __________________', size=9, gap=14)
    r.text('<b>Rating:</b> 1 = unclear or weak fit; 2 = partly meets your needs; 3 = clear, evidenced fit.<br/>Leave unknowns blank and follow up. Safety concerns require answers regardless of any score.', size=9, leading=13, gap=12)
    areas = [
        ('Individualization and fit','One-to-one attention; placement by current skill.'),
        ('Tutor quality and vetting','Teaching ability; clear vetting and safety practices.'),
        ('Teaching approach','Active practice, explanations, and mastery.'),
        ('Progress tracking','Specific evidence of skills gained and next steps.'),
        ('Engagement and relationship','A consistent tutor who knows your child.'),
        ('Real outcomes','Work your child can demonstrate and explain.'),
        ('Practical fit and value','Reliable technology, scheduling, updates, and clear costs.'),
    ]
    r.table([['<b>Evaluation area</b>','<b>A</b>','<b>B</b>','<b>C</b>']] +
            [[f'<b>{a}</b><br/>{b}','','',''] for a,b in areas], [318,70,70,70], [32]+[47]*7)
    r.lines(2, 'Most important criteria for our family / evidence still missing:')
    r.start('Interview notes. Use a copy of this page for each tutor, then compare your evidence on page 1.')
    r.text('Tutor / service: ____________________________  Date: __________________', gap=14)
    questions = [
        'Is it truly one-to-one, and will my child have the same tutor each session?',
        'How do you assess my child before teaching begins?',
        'How will you adapt to their level, pace, interests, and learning gaps?',
        'What specific progress will you show me, and how often?',
        'How are tutors selected and vetted, and how are sessions kept safe?',
        'What will my child be able to do or show after working with you?',
        'What happens when my child gets stuck?',
    ]
    for i,q in enumerate(questions,1): r.prompt(f'{i}.',q)
    r.text('<b>Red flags to investigate:</b> pressure to sign up immediately, vague safety policies, guaranteed grades, rotating tutors, passive lessons, or certificates presented without evidence of learning.', size=9, leading=12, gap=8)
    r.lines(1,'Our next step / unanswered question:')
    r.save()


def coding_checklist():
    r = Resource('coding-readiness-checklist.pdf','Coding Readiness Checklist','coding-roadmap-kids-skill-not-age')
    r.start('Find a starting point by what your child can do today. Use a recent project or short activity, and ask them to explain their thinking.')
    r.text('Child: ____________________________  Date: ____________________________',gap=15)
    r.section('Observe together')
    r.text('For each item, circle: Independently / With help / Not yet. Add one concrete example.',size=9,gap=14)
    for heading,body in [
        ('Reading and typing.','Can they read short instructions and type a few lines without the mechanics taking all their attention?'),
        ('Sequencing and logic.','Can they explain a sequence, a repeated action, and an "if this, then that" choice?'),
        ('Previous experience.','Can they show a project and explain what they built themselves?'),
        ('Debugging.','When a project behaves unexpectedly, can they describe what happened and try a small change?'),
        ('Interest and challenge.','What do they want to build next? Are current activities interesting, frustrating, or too easy?'),
    ]:
        r.prompt(heading,body)
        r.text('Independently / With help / Not yet',size=8,leading=10,color=GRAY,gap=11)
    r.lines(2,'A project or activity my child would love to try:')
    r.start('Choose a trial starting point. These stages guide a conversation; they are not age deadlines or a race.')
    for title,body in [
        ('1. Foundations','New to coding or still building reading, typing, and logic. Try visual blocks: create a short animated story, then explain its steps.'),
        ('2. Real code','Comfortable with core logic and ready to type. Try a small Python quiz or guessing game. Notice whether they can explain variables and choices.'),
        ('3. Web development','Can write and debug basic programs with growing independence. Try a personal page with a button or form that responds to a user.'),
        ('4. Professional tools and AI','Comfortable building working applications. Explore a larger project involving data, version control, or guided AI experiments, with a mentor.'),
    ]:
        r.section(title)
        r.text(body,gap=19)
    r.section('Our starting-path plan')
    r.lines(1,'Stage to try and evidence behind that choice:')
    r.lines(1,'One foundation to strengthen / one project to attempt:')
    r.text('Try a small project, then review how much support was needed. Adjust the level to keep challenge manageable and curiosity alive. Discuss your observations at <link href="https://www.ritetutor.com/contact" color="#171717"><u>ritetutor.com/contact</u></link>.',size=9,leading=13)
    r.save()


def math_check():
    r = Resource('five-question-math-understanding-check.pdf','Five-Question Math Understanding Check','right-math-answer-without-understanding')
    r.start('Use a familiar math problem. Ask calmly, give thinking time, and record your child\'s explanation before offering help.')
    r.text('Child: _________________________  Topic / date: _________________________',gap=12)
    r.lines(1,'Problem your child solved:')
    for title,body in [
        ('1. Why does that work?','Ask for the reason behind a step, not just the name of a rule.'),
        ('2. Can you teach it to me?','Have them explain the idea as if you have never learned it. A drawing or objects are welcome.'),
        ('3. What if the problem changes?','Change the numbers, wording, or representation. Can they connect it to the same idea?'),
        ('4. What does the answer mean?','Ask what the result represents and how they can tell it makes sense.'),
        ('5. What could you try if you got stuck?','Listen for a plan: draw it, try a simpler case, estimate, or check a step.'),
    ]:
        r.prompt(title,body)
        r.text('Explained independently / Explained with prompts / Needs more exploration',size=8,leading=10,color=GRAY,gap=13)
    r.start('Turn observations into a next step. One hesitant explanation is a reason to explore together, not to label a child.')
    r.section('Example: adding fractions')
    r.text('Start with 1/2 + 1/4. Ask your child to draw the fractions on equal-sized wholes, explain why the pieces need a common size, and show why the answer is 3/4.')
    r.text('Then vary the problem: 1/3 + 1/6. Can they explain why the same idea works? If they are stuck, offer a drawing and notice what support makes the idea clearer.',gap=18)
    r.section('Look across the five responses')
    r.table([
        ['<b>What you observed</b>','<b>A useful next step</b>'],
        ['Explains why and adapts to a new example.','Try a slightly richer problem and ask for a second approach.'],
        ['Gets the answer but only repeats a rule.','Use a diagram, objects, or a simpler case to connect the rule to meaning.'],
        ['Understands after a prompt or drawing.','Practice another example, then revisit it later with less support.'],
        ['The same idea is unclear across several examples.','Save the examples and discuss the pattern with a teacher or tutor.'],
    ],[264,264])
    r.lines(2,'The idea that needs more exploration:')
    r.lines(2,'Activity to try / date to revisit / what changed:')
    r.text('Bring this page and a sample of your child\'s work to a conversation with the learning team: <link href="https://www.ritetutor.com/contact" color="#171717"><u>ritetutor.com/contact</u></link>.',size=9,leading=13)
    r.save()


def python_check():
    r = Resource('python-readiness-check.pdf','Python Readiness Check','is-your-child-ready-for-python')
    r.start('Review all 12 signs with your child. Mark each as Yes, Sometimes, or Not yet. Use the pattern of answers to plan support; there is no required total.')
    r.text('Child: ______________________________  Date: __________________________',gap=14)
    groups = [
        ('Foundations',[
            'Understands sequences, loops, and simple conditionals.',
            'Reads short instructions comfortably.',
            'Types simple text without constant difficulty.',
            'Explains why a block-based project behaves as it does.',
        ]),
        ('Readiness for a new challenge',[
            'Completes familiar block-based projects with ease.',
            'Seems bored by activities that used to be exciting.',
            'Imagines projects beyond the limits of current blocks.',
            'Repeats similar projects and wants something new.',
        ]),
        ('Motivation',[
            'Asks how real apps, games, or websites are built.',
            'Wants to type code instead of only dragging blocks.',
            'Is curious about how technology works.',
            'Keeps trying when a project needs fixing.',
        ]),
    ]
    n=0
    for title,items in groups:
        r.section(title)
        rows=[]
        for item in items:
            n+=1
            rows.append([f'<b>{n}.</b> {item}','Yes / Sometimes / Not yet'])
        r.table(rows,[383,145],header=False)
    r.start('Try a short, supported activity. The aim is to observe curiosity, understanding, and the kind of help that makes the transition work.')
    r.section('A small first Python activity')
    r.text('With an adult or mentor, open a suitable Python editor and try the example below. Talk through each line before changing it.',gap=10)
    r.table([['<font face="Courier">name = "Alex"<br/>print("Hello, " + name)</font>']],[528],header=False)
    r.prompt('Try 1.','Predict what will appear when the program runs. What does name store?')
    r.prompt('Try 2.','Change the name and the greeting. Run the program and explain what changed.')
    r.prompt('Try 3.','If something goes wrong while editing, read the message together. Can they compare the code with the working example?')
    r.section('Read the overall picture')
    r.text('<b>Foundations and motivation are present:</b> try a supported beginner Python project.<br/><b>Interest is strong but typing or reading takes effort:</b> add support and keep early programs short.<br/><b>Core logic is still unclear:</b> strengthen it through playful block-based projects and revisit.',gap=15)
    r.lines(1,'Support my child needs for the transition:')
    r.lines(1,'Next small project / date to review:')
    r.text('Explore available coding pathways at <link href="https://www.ritetutor.com/courses" color="#171717"><u>ritetutor.com/courses</u></link>.',size=9,leading=13)
    r.save()


def algebra_check():
    r = Resource('algebra-1-readiness-worksheet.pdf','Algebra 1 Readiness Worksheet','algebra-1-readiness-checklist')
    r.start('Try these six sample tasks before Algebra 1. Ask your child to show their reasoning. Mark each area: Independent / With help / Revisit. Parent review notes are on page 2.')
    r.text('Child: ______________________________  Date: __________________________',gap=15)
    tasks = [
        ('1. Operations with negatives','Compute -5 - 3 and (-4) x (-2). Explain how you chose each sign.'),
        ('2. Fractions, decimals, and percentages','Compute 1/2 + 1/4. Write 3/4 as a decimal and a percentage. Explain why the denominators matter.'),
        ('3. Order of operations','Evaluate 3 + 2 x (5 - 1). Which operation happens first, and why?'),
        ('4. Number sense and properties','Show two ways to calculate 3 x (4 + 2). Explain why both give the same result.'),
        ('5. Variables and equations','Solve x + 5 = 12. What does x stand for, and how can you check the answer?'),
        ('6. Logical reasoning','Three identical notebooks and a $2 pen cost $14 altogether. What does one notebook cost? Write a plan or equation.'),
    ]
    for title,body in tasks:
        r.prompt(title,body)
        r.text('Independent / With help / Revisit',size=8,leading=10,color=GRAY,gap=11)
    r.start('Parent review notes. Ask for reasoning before showing these answers. A single sample task is a starting point for a conversation about each skill area.')
    answers = [
        ('1. Operations with negatives','-5 - 3 = -8; (-4) x (-2) = 8. Look for a coherent explanation of subtraction and the product of two negatives.'),
        ('2. Fractions, decimals, and percentages','1/2 + 1/4 = 3/4; 3/4 = 0.75 = 75%. A half is two quarters, so adding one quarter gives three equal quarter-sized pieces.'),
        ('3. Order of operations','11. First evaluate the parentheses: 5 - 1 = 4. Then multiply: 2 x 4 = 8. Finally add 3.'),
        ('4. Number sense and properties','18. Either compute 3 x 6, or distribute: (3 x 4) + (3 x 2) = 12 + 6. A drawing of three groups can show why.'),
        ('5. Variables and equations','x = 7. Subtract 5 from both sides to preserve equality. Check: 7 + 5 = 12.'),
        ('6. Logical reasoning','$4 per notebook. Subtract the $2 pen from $14, then divide $12 among three notebooks. An equation is 3n + 2 = 14.'),
    ]
    for title,body in answers:
        r.text(f'<b>{title}</b><br/>{body}',size=10,leading=14,gap=14)
    r.lines(1,'Area to revisit / explanation or example that was difficult:')
    r.lines(1,'One practice activity / person to ask / review date:')
    r.text('Use additional examples to explore fractions, exponents, division, and other prerequisite skills mentioned in the article. Discuss recurring gaps with your child\'s teacher or at <link href="https://www.ritetutor.com/contact" color="#171717"><u>ritetutor.com/contact</u></link>.',size=9,leading=13)
    r.save()


def ai_check():
    r = Resource('ai-readiness-and-safety-checklist.pdf','AI Readiness & Safety Checklist','ai-can-write-code-what-children-should-learn')
    r.start('Use a small, age-appropriate coding project to discuss these six skills with your child. No AI account is required to complete this conversation.')
    r.text('Child: ______________________________  Date: __________________________',gap=14)
    for title,body in [
        ('1. Computational thinking','Can they turn a goal, such as a quiz game, into clear steps before asking a tool for help?'),
        ('2. Problem-solving','Can they describe what is wrong, suggest an approach, and try a simpler example?'),
        ('3. Reading and judging code','Can they explain a short piece of code and test whether it does what they intended?'),
        ('4. Creativity and purpose','Can they name a problem worth solving and explain who their project would help?'),
        ('5. Resilience and adaptability','Can they revise a plan when a first attempt fails, and describe what they learned?'),
        ('6. Understanding AI','Can they explain that generated answers can be wrong and name a way to check them?'),
    ]:
        r.prompt(title,body)
        r.text('Independent / With guidance / Next skill to build',size=8,leading=10,color=GRAY,gap=11)
    r.start('Make a family plan before using an AI tool. Revisit it together as your child\'s projects and independence grow.')
    r.section('Safety and learning habits')
    items = [
        'An adult checks the tool\'s age requirements, account settings, and suitability before approving use.',
        'We avoid sharing passwords, contact details, school information, private photos, or other people\'s personal data.',
        'We use invented names and sample data when experimenting.',
        'We check important claims and test generated code instead of assuming it is correct.',
        'An adult or mentor reviews unfamiliar code, links, and downloads before they are used.',
        'We use hints and explanations to learn, and follow school rules about AI assistance and attribution.',
        'We pause and tell a trusted adult if a tool produces upsetting content or asks for something uncomfortable.',
        'We agree on where, when, and with whom AI tools may be used, and review what was learned.',
    ]
    r.table([[f'<b>{i}.</b> {escape(item)}','Agreed / Discuss'] for i,item in enumerate(items,1)],[420,108],header=False)
    r.lines(1,'Approved activity / supervising adult:')
    r.lines(1,'How we will check the output / when we will review:')
    r.text('A useful closing question: <b>"What do you understand now that you did not understand before using the tool?"</b> Keep the explanation, not just the generated output, at the center of learning.',size=9,leading=13)
    r.save()


if __name__ == '__main__':
    for generate in [tutor_scorecard, coding_checklist, math_check, python_check, algebra_check, ai_check]:
        generate()
