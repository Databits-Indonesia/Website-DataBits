import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="h1 mt-12 mb-6 first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="h2-sm mt-10 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="h3-sm mt-8 mb-3">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="h4-sm mt-6 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="p mb-4 leading-relaxed">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-600 dark:text-gray-400 ml-4">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-600 dark:text-gray-400 ml-4">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="ml-2">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-6 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 rounded">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isInline = !className?.includes('language-');
    if (isInline) {
      return (
        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
          {children}
        </code>
      );
    }
    return (
      <code className={className}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 text-sm font-mono border border-gray-800">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="table">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-100 dark:bg-gray-800">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody>
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-gray-300 dark:border-gray-700">
      {children}
    </tr>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
      {children}
    </td>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">
      {children}
    </th>
  ),
  hr: () => (
    <hr className="my-8 border-gray-300 dark:border-gray-700" />
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-gray-900 dark:text-gray-100">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-gray-700 dark:text-gray-300">
      {children}
    </em>
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}