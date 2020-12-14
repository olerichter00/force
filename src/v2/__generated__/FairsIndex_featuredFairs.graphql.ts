/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairsIndex_featuredFairs = ReadonlyArray<{
    readonly items: ReadonlyArray<{
        readonly title?: string | null;
        readonly subtitle?: string | null;
        readonly image?: {
            readonly url: string | null;
        } | null;
    } | null> | null;
    readonly " $refType": "FairsIndex_featuredFairs";
}>;
export type FairsIndex_featuredFairs$data = FairsIndex_featuredFairs;
export type FairsIndex_featuredFairs$key = ReadonlyArray<{
    readonly " $data"?: FairsIndex_featuredFairs$data;
    readonly " $fragmentRefs": FragmentRefs<"FairsIndex_featuredFairs">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "FairsIndex_featuredFairs",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "subtitle",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "version",
                      "value": "large_rectangle"
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": "url(version:\"large_rectangle\")"
                }
              ],
              "storageKey": null
            }
          ],
          "type": "FeaturedLink"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderedSet"
};
(node as any).hash = 'a8d790ae605dc80e02c1af6fb9163060';
export default node;
