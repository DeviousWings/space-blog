# The main Flask application file that contains the application setup and routes.

import os
from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_migrate import Migrate
from flask import request, flash, redirect


app = Flask(__name__, template_folder='frontend/src/templates',
            static_folder='frontend/static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'

# Set the absolute path to the frontend directory
frontend_dir = os.path.abspath(os.path.join(
    os.path.dirname(__file__), 'frontend'))


# database
db = SQLAlchemy(app)


class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<BlogPost %r>' % self.title


with app.app_context():
    db.create_all()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/categories')
def categories():
    return render_template('categories.html')


@app.route('/create', methods=['GET', 'POST'])
def create():
    if request.method == 'POST':
        # Retrieve the form data and create a new blog post
        title = request.form.get('title')
        content = request.form.get('content')
        author = request.form.get('author')

        # Create a new instance of the BlogPost model and save it to the database
        new_post = BlogPost(title=title, content=content, author=author)
        db.session.add(new_post)
        db.session.commit()

        # Redirect to the home page or display a success message
        flash('Blog post created successfully!')
        return redirect(url_for('index'))

    return render_template('create.html')


@app.route('/about')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    app.run(debug=True)
