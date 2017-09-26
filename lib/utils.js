'use strict';

exports.sanitizeCommitMessage = (message) => {
  return message
    .split('\n')
    .filter((line) => line.indexOf('#') !== 0)
    .join('\n')
    .trim();
};