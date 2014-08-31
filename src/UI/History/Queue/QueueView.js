﻿'use strict';
define(
    [
        'underscore',
        'marionette',
        'History/Queue/QueueCollection'
    ], function (_, Marionette, QueueCollection) {
        return Marionette.ItemView.extend({
            tagName: 'span',

            initialize: function () {
                this.listenTo(QueueCollection, 'sync', this.render);
                QueueCollection.fetch();
            },

            render: function () {
                this.$el.empty();

                if (QueueCollection.length === 0) {
                    return this;
                }

                var count = QueueCollection.length;
                var label = 'label-info';
                var errors = QueueCollection.some(function (model) {
                    return model.get('errorMessage') !== '';
                });

                if (errors) {
                    label = 'label-danger';
                }

                this.$el.html('<span class="label {0}">{1}</span>'.format(label, count));
                return this;
            }
        });
    });
