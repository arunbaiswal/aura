/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
({
    afterRender: function(cmp, helper) {
        this.superAfterRender();

        var options = cmp.get("v.options");
        options = $A.util.isUndefinedOrNull(options) ? [] : options;

        if (!cmp.get("v.useMenu")) {
            var selectElement = cmp.find("select").getElement();

            // Setting the 'multiple' attribute on the component does not work on the edge browser.
            if (cmp.get("v.multiple")) {
                selectElement.setAttribute("multiple", true);
            }

            if (!$A.util.isEmpty(options) || $A.util.isEmpty(cmp.get("v.body"))) {
                var optionElements = helper.renderOptions(cmp, options);
                selectElement.appendChild(optionElements);
            }
        }
    },

    rerender: function(cmp, helper) {
        this.superRerender();

        var options = cmp.get("v.options");

        if (!cmp.get("v.useMenu")) {
            var selectCmp = cmp.find("select");
            // select could have been unrendered/destroyed by users or the framework in some cases
            if (!selectCmp.isValid() || !selectCmp.isRendered()) {
                return;
            }

            var selectElement = cmp.find("select").getElement();

            // Setting the 'multiple' attribute on the component does not work on the edge browser.
            if (cmp.get("v.multiple")) {
                selectElement.setAttribute("multiple", true);
            }

            if (!$A.util.isEmpty(options) || $A.util.isEmpty(cmp.get("v.body"))) {
                var optionElements = selectElement.children;

                // Remove extra option elements
                while (optionElements.length > options.length) {
                    selectElement.removeChild(optionElements[options.length]);
                }

                // Update existing option elements with info from options array
                var index = 0;
                while (index < optionElements.length) {
                    helper.updateOptionElement(cmp, options[index], optionElements[index]);
                    index++;
                }

                // Create new option elements for the remaining options and add them to the DOM
                if (index < options.length) {
                    var newElements = helper.renderOptions(cmp, options.slice(index));

                    selectElement.appendChild(newElements);
                }
            }
        }
    }
})// eslint-disable-line semi
