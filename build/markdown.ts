import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import taskList from 'markdown-it-task-lists'

const markdownIt: MarkdownIt.Options = new MarkdownIt({
  html: true,
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, str).value
    }
    return ''
  }
}).use(taskList)

export default markdownIt
