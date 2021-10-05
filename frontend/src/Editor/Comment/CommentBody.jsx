import React from 'react';
import cx from 'classnames';
import Spinner from '@/_ui/Spinner';

import { isEmpty } from 'lodash';
import moment from 'moment';
import CommentActions from './CommentActions';

const CommentBody = ({ threadId, thread, isResolved, isLoading, setEditComment, setEditCommentId }) => {
  const getContent = () => {
    if (isEmpty(thread)) return <div className="text-center">Your message will post here</div>;

    return (
      <div className="divide-y">
        {thread.map(({ id, comment, createdAt, user = {} }) => {
          return (
            <div key={id}>
              <div className="d-flex card-title">
                {`${user?.firstName} ${user?.lastName}`}{' '}
                <CommentActions
                  comment={comment}
                  threadId={threadId}
                  commentId={id}
                  isResolved={isResolved}
                  setEditComment={setEditComment}
                  setEditCommentId={setEditCommentId}
                />
              </div>

              <div className="card-subtitle">{moment(createdAt).fromNow()}</div>
              <p className="cursor-auto">{comment}</p>
            </div>
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="card-body text-center">
        <Spinner />
      </div>
    );
  }

  return <div className={cx('card-body card-body-scrollable card-body-scrollable-shadow')}>{getContent()}</div>;
};

export default CommentBody;
