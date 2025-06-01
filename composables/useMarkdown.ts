import { marked } from 'marked'

export const useMarkdown = () => {
  const parseMarkdown = (markdown: string) => {
    // Use marked to parse the markdown
    const html = marked(markdown)

    // Return the parsed HTML
    return html
  }

  return {
    parseMarkdown,
  }
}
