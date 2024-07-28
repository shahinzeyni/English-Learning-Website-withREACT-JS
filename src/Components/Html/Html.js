import React from 'react'
import DOMPurify from 'dompurify';

export default function Html() {

    let testHtmlTemplate = `
        <h1>متن عنوان سکشن</h1>
        <p>
            اینچا هم متن توضیحات این سکشن هست
        </p>
        <p>
            <b>توضیحات بولد</b>
        </p>
        <img src="oinfbo" onerror="alert('HACKED BY SABZLEARN :))')" />
    `

  return (
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(testHtmlTemplate) }}>

    </div>
  )
}
