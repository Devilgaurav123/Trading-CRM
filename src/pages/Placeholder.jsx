import PageHeader from '../components/PageHeader.jsx'

export default function Placeholder({ title, text }) {
  return (
    <>
      <PageHeader eyebrow={title} title={title} subtitle={text} />
      <div className="card empty-card">
        <p>This page is coming next.</p>
      </div>
    </>
  )
}
