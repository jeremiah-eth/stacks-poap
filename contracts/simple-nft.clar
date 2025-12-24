;; simple-nft
;; <add a description here>

(define-non-fungible-token my-nft uint)

(define-data-var last-token-id uint u0)

(define-public (mint)
    (let ((token-id (+ (var-get last-token-id) u1)))
        (try! (nft-mint? my-nft token-id tx-sender))
        (var-set last-token-id token-id)
        (ok token-id)
    )
)
