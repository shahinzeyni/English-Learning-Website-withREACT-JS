import React from "react";
import { Link } from "react-router-dom";

import "./ArticleBox.css";

export default function ArticleBox({
  title,
  description,
  cover,
  shortName,
  creator,
  createdAt
}) {
  return (
    <div className="courseBoxCol">
      <div className="article-card">
        <div className="article-card__header">
          <Link
            to={`/article-info/${shortName}`}
            className="article-card__link-img"
          >
            <img
              src={`http://localhost:4000/courses/covers/${cover}`}
              className="article-card__img"
              alt="Article Cover"
            />
          </Link>
        </div>
        <div className="article-card__content">
          <Link
            to={`/article-info/${shortName}`}
            className="article-card__link"
          >
            {title}
          </Link>
          <p className="article-card__text">
            {description}
          </p>

          <div className="article_card_cretor">
            <div className="article_card_cretor_right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="6" r="4" />
                  <path
                    strokeLinecap="round"
                    d="M19.998 18c.002-.164.002-.331.002-.5c0-2.485-3.582-4.5-8-4.5s-8 2.015-8 4.5S4 22 12 22c2.231 0 3.84-.157 5-.437"
                  />
                </g>
              </svg>
              <span className="article_card_cretor_rightName">شاهین زینی</span>
            </div>

            <div className="article_card_cretor_left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    stroke="currentColor"
                    strokeWidth="1.5"
                    d="M2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M7 4V2.5M17 4V2.5M2.5 9h19"
                  />
                  <path
                    fill="currentColor"
                    d="M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                  />
                </g>
              </svg>
              <span className="article_card_cretor_leftCalender">
                {createdAt.slice(0, 10)}
              </span>
            </div>
          </div>

          <Link to={`/article-info/${shortName}`} className="article-card__btn">
            مطالعه مقاله
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              >
                <path strokeLinejoin="round" d="M16 12H8m0 0l3-3m-3 3l3 3" />
                <path d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536" />
              </g>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
