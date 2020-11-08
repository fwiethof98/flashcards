# Get JS from react
f = open('frontend-react/build/index.html', 'r')
data = f.read()

prefix = '</div>'
suffix = '</script>'
index1 = (data.find('</div><script>')) + len(prefix)
index2 = (data.find('</script></body>')) + len(suffix)

data = data[index1:index2]
f.close()

# Write to js.html
f = open('backend-django/flashcards/templates/react/js.html', 'w')
f.write(data)

f.close()
