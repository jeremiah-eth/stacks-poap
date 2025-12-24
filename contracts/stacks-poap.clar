;; stacks-poap
;; Simple POAP minting contract

(define-non-fungible-token poap-badge uint)

(define-data-var last-token-id uint u0)

(define-public (mint)
    (let ((token-id (+ (var-get last-token-id) u1)))
        (try! (nft-mint? poap-badge token-id tx-sender))
        (var-set last-token-id token-id)
        (ok token-id)
    )
)
