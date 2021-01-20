import { Markdown as TextAsMarkdown } from '@/modules/core/data/types/Markdown';
import {
  css,
  useTheme,
} from '@emotion/react';
import React from 'react';
import { Container } from 'reactstrap';
import Markdown from './Markdown';

export type Props = {
  content: TextAsMarkdown;
}

/**
 * Displays content in a special way (different styles).
 *
 * Meant to be used to display anything that is legal-related (privacy policies, terms of use, etc.)
 */
const LegalContent: React.FunctionComponent<Props> = (props): JSX.Element => {
  const theme = useTheme();
  const { primaryColor } = theme;
  const { content } = props;

  return (
    <Container>
      <div
        css={css`
          .legal-content {
            margin: 50px 150px 150px;

            h1 {
              color: ${primaryColor};
              font-size: 35px;
            }

            h2 {
              font-size: 20px;
              margin-top: 35px;
            }

            h3 {
              font-size: 17px;
            }

            h4 {
              font-size: 13px;
              font-weight: 300;
            }

            h5 {
              font-size: 13px;
              font-weight: 100;
            }

            h6 {
              font-size: 10px;
            }

            table {
              border-collapse: collapse;

              td {
                border: 1px solid black;
                padding: 10px;
              }

              tr {
                &:first-child td {
                  border-top: 0;
                }

                &:last-child td {
                  border-bottom: 0;
                }

                td {
                  &:first-child {
                    border-left: 0;
                  }

                  &:last-child {
                    border-right: 0;
                  }
                }
              }
            }
          }
        `}
      >
        <div className={'legal-content'}>
          <Markdown
            text={content}
            markdownOptions={{
              disableParsingRawHTML: false,
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default LegalContent;
